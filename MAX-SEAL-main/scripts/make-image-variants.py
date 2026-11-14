"""Make small WebP copies of large site images (run by hand, commit the output).

Product photos are 450-600 KB PNGs but are often shown at 50-90px, and the
industry hero photos are ~800 KB. This writes:

  public/assets/maxseal/thumbs/<name>.webp
      200x200 WebP thumbnail of every product image listed in the catalog
      (src/data/generated/catalog.json - run `npm run catalog:generate` first).
      Used through thumbFor() in src/data/imageVariants.js, which falls back
      to the original image if a thumbnail is missing.

  public/assets/maxseal/industries/<name>-800.webp / -1600.webp
      WebP versions of the industry photos for hero images (srcset).

Usage:  python scripts/make-image-variants.py
Needs:  Pillow (pip install pillow)
"""
import json, os, re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, 'public')
THUMBS = os.path.join(PUBLIC, 'assets', 'maxseal', 'thumbs')


def thumb_name(path):
    """Must match thumbFor() in src/data/imageVariants.js."""
    base = os.path.splitext(os.path.basename(path))[0]
    return re.sub(r'[^a-z0-9]+', '-', base.lower()).strip('-') + '.webp'


def save_thumb(src_rel):
    src = os.path.join(PUBLIC, src_rel.lstrip('/'))
    if not os.path.exists(src):
        return None
    im = Image.open(src)
    im = im.convert('RGBA') if im.mode in ('P', 'LA', 'RGBA') else im.convert('RGB')
    im.thumbnail((200, 200), Image.LANCZOS)
    out = os.path.join(THUMBS, thumb_name(src_rel))
    im.save(out, 'WEBP', quality=82, method=6)
    return out


def main():
    os.makedirs(THUMBS, exist_ok=True)
    catalog = json.load(open(os.path.join(ROOT, 'src', 'data', 'generated', 'catalog.json'), encoding='utf-8'))
    paths = sorted({p['image'] for p in catalog['products'] if p.get('image')})
    total_in = total_out = 0
    for rel in paths:
        out = save_thumb(rel)
        if out:
            total_in += os.path.getsize(os.path.join(PUBLIC, rel.lstrip('/')))
            total_out += os.path.getsize(out)
    print(f'{len(paths)} product thumbnails: {total_in // 1024} KB -> {total_out // 1024} KB')

    ind = os.path.join(PUBLIC, 'assets', 'maxseal', 'industries')
    for f in sorted(os.listdir(ind)):
        if not f.lower().endswith('.png'):
            continue
        im = Image.open(os.path.join(ind, f)).convert('RGB')
        for w in (800, 1600):
            v = im.copy()
            if v.width > w:
                v = v.resize((w, round(v.height * w / v.width)), Image.LANCZOS)
            v.save(os.path.join(ind, f'{os.path.splitext(f)[0]}-{w}.webp'), 'WEBP', quality=72, method=6)
    print('industry photos: WebP 800 / 1600 written')


if __name__ == '__main__':
    main()

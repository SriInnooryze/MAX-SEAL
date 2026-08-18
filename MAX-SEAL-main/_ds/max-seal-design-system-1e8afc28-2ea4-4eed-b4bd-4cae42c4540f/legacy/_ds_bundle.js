/**
 * Legacy Claude Website Builder Design System
 *
 * Preserved for historical reference.
 * Not used by the React application.
 * All runtime functionality has been migrated into
 * src/components/ds/.
 */

/* @ds-bundle: {"format":3,"namespace":"MaxSealDesignSystem_1e8afc","components":[{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"ProductCard","sourcePath":"components/data/ProductCard.jsx"},{"name":"SpecTable","sourcePath":"components/data/SpecTable.jsx"},{"name":"Stat","sourcePath":"components/data/Stat.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/disclosure/Tabs.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"SectionHeading","sourcePath":"components/layout/SectionHeading.jsx"}],"sourceHashes":{"components/data/Badge.jsx":"34e3b2f8fa20","components/data/ProductCard.jsx":"b87d9e2d742b","components/data/SpecTable.jsx":"fddf2c1f07a0","components/data/Stat.jsx":"cba3d9a3a2bc","components/data/Tag.jsx":"38b78629d45e","components/disclosure/Accordion.jsx":"d07e8956de5c","components/disclosure/Tabs.jsx":"4b62c9961346","components/forms/Button.jsx":"764ae47eb9ef","components/forms/Checkbox.jsx":"594103478853","components/forms/IconButton.jsx":"1a8ccb12fd16","components/forms/Input.jsx":"64007634d316","components/forms/Select.jsx":"3a25ab6ed103","components/forms/Textarea.jsx":"600e73fd4baa","components/layout/SectionHeading.jsx":"39b74fbc27cb","ui_kits/website/Enquiry.jsx":"bfd4db9fffd3","ui_kits/website/EnquiryForm.jsx":"218eae4612ce","ui_kits/website/Footer.jsx":"c910abd06069","ui_kits/website/Header.jsx":"7786f741d865","ui_kits/website/Home.jsx":"c49c3c92d49d","ui_kits/website/ProductDetail.jsx":"07cf994cd92f","ui_kits/website/Products.jsx":"241b16eb594a","ui_kits/website/Resources.jsx":"2c7b12f36c38","ui_kits/website/data.jsx":"b4903c23a1a4","ui_kits/website/icons.jsx":"9867e943f835","ui_kits/website/ui.jsx":"5faec5bbeebc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MaxSealDesignSystem_1e8afc = window.MaxSealDesignSystem_1e8afc || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — compact status / certification label.
 */
function Badge({
  variant = "default",
  dot = false,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-badge", variant !== "default" ? `ms-badge--${variant}` : "", className].filter(Boolean).join(" ")
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "ms-dot",
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ArrowLink = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 5 19 12 12 19"
}));

/**
 * ProductCard — interactive product tile with image zoom on hover,
 * a badge, key spec meta, and a "View product" link.
 */
function ProductCard({
  title,
  description,
  image,
  badge,
  meta = [],
  href = "#",
  cta = "View product",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: ["ms-card", "ms-product", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ms-product__media"
  }, badge ? /*#__PURE__*/React.createElement("span", {
    className: "ms-product__badge"
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "solid"
  }, badge)) : null, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    loading: "lazy"
  }) : null), /*#__PURE__*/React.createElement("div", {
    className: "ms-product__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-product__title"
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    className: "ms-product__desc"
  }, description) : null, meta.length ? /*#__PURE__*/React.createElement("div", {
    className: "ms-product__meta"
  }, meta.map(([k, v], i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, k, " ", /*#__PURE__*/React.createElement("b", null, v)))) : null, /*#__PURE__*/React.createElement("div", {
    className: "ms-product__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-product__link"
  }, cta, " ", /*#__PURE__*/React.createElement(ArrowLink, null)))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/data/SpecTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SpecTable — two-column technical specification table.
 * `rows` is an array of [label, value] pairs; `caption` is optional.
 */
function SpecTable({
  caption,
  rows = [],
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("table", _extends({
    className: ["ms-spec", className].filter(Boolean).join(" ")
  }, rest), caption ? /*#__PURE__*/React.createElement("caption", null, caption) : null, /*#__PURE__*/React.createElement("tbody", null, rows.map(([k, v], i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, k), /*#__PURE__*/React.createElement("td", null, v)))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/data/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat — large figure with label, for credibility metrics.
 * `unit` is tinted in the brand highlight.
 */
function Stat({
  value,
  unit,
  label,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-stat", className].filter(Boolean).join(" ")
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ms-stat__value"
  }, value, unit ? /*#__PURE__*/React.createElement("span", {
    className: "ms-unit"
  }, unit) : null), label ? /*#__PURE__*/React.createElement("div", {
    className: "ms-stat__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Stat.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — filter chip. Toggleable (aria-pressed) or removable (onRemove).
 */
function Tag({
  active = false,
  onRemove,
  className = "",
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ["ms-tag", className].filter(Boolean).join(" "),
    role: "button",
    tabIndex: 0,
    "aria-pressed": active
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Accordion.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
function Item({
  item,
  open,
  onToggle
}) {
  const ref = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    if (ref.current) setH(open ? ref.current.scrollHeight : 0);
  }, [open, item.content]);
  return /*#__PURE__*/React.createElement("div", {
    className: "ms-acc__item",
    "data-open": open
  }, /*#__PURE__*/React.createElement("button", {
    className: "ms-acc__head",
    "aria-expanded": open,
    onClick: onToggle
  }, item.label, /*#__PURE__*/React.createElement("span", {
    className: "ms-acc__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "ms-acc__panel",
    style: {
      height: h
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-acc__inner",
    ref: ref
  }, item.content)));
}

/**
 * Accordion — stacked expandable rows. `items` is [{ id, label, content }].
 * Set `allowMultiple` to keep several panels open at once.
 */
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = [],
  className = ""
}) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = id => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-acc", className].filter(Boolean).join(" ")
  }, items.map(it => /*#__PURE__*/React.createElement(Item, {
    key: it.id,
    item: it,
    open: open.has(it.id),
    onToggle: () => toggle(it.id)
  })));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/Tabs.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Tabs — underline tab strip with switchable panels.
 * `items` is [{ id, label, content }]. Controlled via `value`/`onChange`
 * if provided, otherwise self-manages state.
 */
function Tabs({
  items = [],
  value,
  onChange,
  defaultValue,
  className = ""
}) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;
  const select = id => {
    if (onChange) onChange(id);
    if (value === undefined) setInternal(id);
  };
  const current = items.find(t => t.id === active);
  return /*#__PURE__*/React.createElement("div", {
    className: className
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-tabs",
    role: "tablist"
  }, items.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    role: "tab",
    className: "ms-tab",
    "aria-selected": t.id === active,
    onClick: () => select(t.id)
  }, t.label))), current?.content !== undefined ? /*#__PURE__*/React.createElement("div", {
    role: "tabpanel",
    style: {
      paddingTop: "var(--space-5)"
    }
  }, current.content) : null);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action element for Max-Seal surfaces.
 * Renders as <button> or, when `href` is set, an <a>.
 */
function Button({
  variant = "primary",
  size = "md",
  block = false,
  href,
  icon,
  iconRight,
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = ["ms-btn", `ms-btn--${variant}`, size !== "md" ? `ms-btn--${size}` : "", block ? "ms-btn--block" : "", className].filter(Boolean).join(" ");
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon, children ? /*#__PURE__*/React.createElement("span", null, children) : null, iconRight);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      className: classes
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: classes,
    disabled: disabled,
    "aria-disabled": disabled
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Check = () => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));

/**
 * Checkbox / Radio — single toggle control with a label.
 * Set `type="radio"` for a radio variant.
 */
function Checkbox({
  label,
  type = "checkbox",
  className = "",
  ...rest
}) {
  const isRadio = type === "radio";
  return /*#__PURE__*/React.createElement("label", {
    className: ["ms-check", isRadio ? "ms-check--radio" : "", className].filter(Boolean).join(" ")
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "ms-box"
  }, !isRadio ? /*#__PURE__*/React.createElement(Check, null) : null), label ? /*#__PURE__*/React.createElement("span", null, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square 44px control for a single icon action.
 */
function IconButton({
  label,
  icon,
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: ["ms-iconbtn", className].filter(Boolean).join(" "),
    "aria-label": label,
    title: label
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field with optional help / error text.
 */
function Input({
  label,
  id,
  required = false,
  error,
  help,
  className = "",
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const msg = error || help;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", error ? "ms-field--error" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ms-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ms-req",
    "aria-hidden": "true"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "ms-input",
    required: required,
    "aria-invalid": !!error
  }, rest)), msg ? /*#__PURE__*/React.createElement("span", {
    className: "ms-help"
  }, msg) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — labelled native dropdown with a chevron affordance.
 * Pass options as [{value, label}] or use children <option>s.
 */
function Select({
  label,
  id,
  required = false,
  error,
  help,
  options,
  placeholder,
  className = "",
  children,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const msg = error || help;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", error ? "ms-field--error" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ms-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ms-req",
    "aria-hidden": "true"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "ms-select",
    required: required,
    defaultValue: "",
    "aria-invalid": !!error
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options ? options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), msg ? /*#__PURE__*/React.createElement("span", {
    className: "ms-help"
  }, msg) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Textarea — labelled multiline field for messages.
 */
function Textarea({
  label,
  id,
  required = false,
  error,
  help,
  className = "",
  rows = 4,
  ...rest
}) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined);
  const msg = error || help;
  return /*#__PURE__*/React.createElement("div", {
    className: ["ms-field", error ? "ms-field--error" : "", className].filter(Boolean).join(" ")
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "ms-label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "ms-req",
    "aria-hidden": "true"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    className: "ms-textarea",
    rows: rows,
    required: required,
    "aria-invalid": !!error
  }, rest)), msg ? /*#__PURE__*/React.createElement("span", {
    className: "ms-help"
  }, msg) : null);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeading — eyebrow + title + optional subtitle block.
 * Use `tone="dark"` on navy sections and `align="center"` to center.
 */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "left",
  className = "",
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ["ms-section-head", tone === "dark" ? "ms-section-head--dark" : "", align === "center" ? "ms-section-head--center" : "", className].filter(Boolean).join(" ")
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "ms-section-head__eyebrow"
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "ms-section-head__title"
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    className: "ms-section-head__sub"
  }, subtitle) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Enquiry.jsx
try { (() => {
/* Enquiry page — full form + quick contact + locations */
function MSEnquiry({
  go
}) {
  const {
    Button
  } = window.MSUI;
  const Ic = window.MSIcons;
  const D = window.MSData;
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero page-hero--enq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero__grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("home");
    }
  }, "Home"), /*#__PURE__*/React.createElement(Ic.ChevronRight, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Enquiry")), /*#__PURE__*/React.createElement("h1", {
    className: "page-hero__title"
  }, "Request a quote or ask the engineers"), /*#__PURE__*/React.createElement("p", {
    className: "page-hero__sub"
  }, "Send your application details and our team will respond within one business day with sizing, pricing, and lead time."))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container enq-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "enq-page__main"
  }, /*#__PURE__*/React.createElement(window.MSEnquiryForm, null)), /*#__PURE__*/React.createElement("aside", {
    className: "enq-page__aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "enq-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Quick contact"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-side-link"
  }, /*#__PURE__*/React.createElement("span", {
    className: "enq-side-link__ic"
  }, /*#__PURE__*/React.createElement(Ic.Phone, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Call"), /*#__PURE__*/React.createElement("span", null, D.contact.phone))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-side-link"
  }, /*#__PURE__*/React.createElement("span", {
    className: "enq-side-link__ic"
  }, /*#__PURE__*/React.createElement(Ic.Mail, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Email"), /*#__PURE__*/React.createElement("span", null, D.contact.email))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-side-link enq-side-link--wa"
  }, /*#__PURE__*/React.createElement("span", {
    className: "enq-side-link__ic"
  }, /*#__PURE__*/React.createElement(Ic.Whatsapp, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "WhatsApp"), /*#__PURE__*/React.createElement("span", null, D.contact.whatsapp)))), /*#__PURE__*/React.createElement("div", {
    className: "enq-side-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Head office"), /*#__PURE__*/React.createElement("p", {
    className: "enq-addr"
  }, /*#__PURE__*/React.createElement(Ic.MapPin, {
    size: 16
  }), " Houston, Texas, USA"), /*#__PURE__*/React.createElement("p", {
    className: "enq-hours"
  }, "Mon to Fri \xB7 8:00 to 18:00 CT"), /*#__PURE__*/React.createElement("div", {
    className: "enq-worldwide"
  }, /*#__PURE__*/React.createElement(Ic.Globe, {
    size: 16
  }), " Worldwide supply and support")), /*#__PURE__*/React.createElement("div", {
    className: "enq-side-card enq-side-card--certs"
  }, /*#__PURE__*/React.createElement("h4", null, "Certified supplier"), /*#__PURE__*/React.createElement("div", {
    className: "enq-certs"
  }, D.certs.map(c => /*#__PURE__*/React.createElement("span", {
    key: c
  }, c))))))));
}
window.MSEnquiry = MSEnquiry;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Enquiry.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/EnquiryForm.jsx
try { (() => {
/* Shared enquiry / quote form — used on the homepage and the enquiry page */
function MSEnquiryForm({
  compact
}) {
  const {
    Field,
    Button
  } = window.MSUI;
  const Ic = window.MSIcons;
  const {
    enquiryOptions,
    countries
  } = window.MSData;
  const [sent, setSent] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      className: "enq-done"
    }, /*#__PURE__*/React.createElement("div", {
      className: "enq-done__mark"
    }, /*#__PURE__*/React.createElement(Ic.Check, {
      size: 28
    })), /*#__PURE__*/React.createElement("h3", null, "Thank you. Your enquiry has been received."), /*#__PURE__*/React.createElement("p", null, "An engineer will reply within one business day. For urgent requests, call or message us on WhatsApp."), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => setSent(false)
    }, "Send another enquiry"));
  }
  return /*#__PURE__*/React.createElement("form", {
    className: "enq-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "enq-grid" + (compact ? " enq-grid--compact" : "")
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Name",
    placeholder: "Full name",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Company Name",
    placeholder: "Company",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Mobile Number",
    type: "tel",
    placeholder: "+1 000 000 0000"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "State",
    placeholder: "State or region"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Country",
    as: "select",
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Select country"), countries.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "enq-span"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Choose an Option",
    as: "select",
    required: true
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "What do you need?"), enquiryOptions.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o)))), /*#__PURE__*/React.createElement("div", {
    className: "enq-span"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Message",
    as: "textarea",
    placeholder: "Tell us about your application: media, size, pressure class, temperature, and quantity."
  }))), /*#__PURE__*/React.createElement("div", {
    className: "enq-foot"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ms-check"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", {
    className: "ms-box"
  }, /*#__PURE__*/React.createElement(Ic.Check, {
    size: 13
  })), /*#__PURE__*/React.createElement("span", null, "I agree to be contacted about my enquiry.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Request a Quote")));
}
window.MSEnquiryForm = MSEnquiryForm;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/EnquiryForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Site footer with quick contact, product links, and certifications */
function MSFooter({
  go
}) {
  const Ic = window.MSIcons;
  const {
    products,
    contact,
    certs
  } = window.MSData;
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot__top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot__brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/maxseal-logo.png",
    alt: "Max-Seal Valves & Controls"
  }), /*#__PURE__*/React.createElement("p", null, "Engineered butterfly valves and automated packages for demanding industrial service. Supplied to distributors and end users worldwide."), /*#__PURE__*/React.createElement("div", {
    className: "foot__contact"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "foot__cbtn"
  }, /*#__PURE__*/React.createElement(Ic.Phone, {
    size: 16
  }), " Call"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "foot__cbtn"
  }, /*#__PURE__*/React.createElement(Ic.Mail, {
    size: 16
  }), " Email"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "foot__cbtn foot__cbtn--wa"
  }, /*#__PURE__*/React.createElement(Ic.Whatsapp, {
    size: 16
  }), " WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    className: "foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Products"), /*#__PURE__*/React.createElement("ul", null, products.slice(0, 6).map(p => /*#__PURE__*/React.createElement("li", {
    key: p.id
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("product", p.id);
    }
  }, p.name.replace(" Butterfly Valves", "")))))), /*#__PURE__*/React.createElement("div", {
    className: "foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Resources"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("catalog");
    }
  }, "Catalog")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("marketing");
    }
  }, "Marketing")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("pricelists");
    }
  }, "Pricelists")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("enquiry");
    }
  }, "Ask the Engineers")))), /*#__PURE__*/React.createElement("div", {
    className: "foot__col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contact"), /*#__PURE__*/React.createElement("ul", {
    className: "foot__plain"
  }, /*#__PURE__*/React.createElement("li", null, contact.phone), /*#__PURE__*/React.createElement("li", null, contact.email), /*#__PURE__*/React.createElement("li", null, "Houston, Texas, USA")))), /*#__PURE__*/React.createElement("div", {
    className: "foot__certs"
  }, certs.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "foot__cert"
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "foot__bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Max-Seal Inc. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    className: "foot__legal"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Sitemap")))));
}
window.MSFooter = MSFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
/* Site header: utility bar + sticky main nav */
function MSHeader({
  active,
  go
}) {
  const {
    Button
  } = window.MSUI;
  const Ic = window.MSIcons;
  const {
    nav,
    contact
  } = window.MSData;
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const root = document.querySelector(".ms-scroll");
    const el = root || window;
    const onScroll = () => setScrolled((root ? root.scrollTop : window.scrollY) > 8);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: "site-head" + (scrolled ? " is-scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "util"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container util__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "util__contacts"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "util__link"
  }, /*#__PURE__*/React.createElement(Ic.Phone, {
    size: 15
  }), " ", contact.phone), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "util__link"
  }, /*#__PURE__*/React.createElement(Ic.Mail, {
    size: 15
  }), " ", contact.email), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "util__link util__wa"
  }, /*#__PURE__*/React.createElement(Ic.Whatsapp, {
    size: 15
  }), " WhatsApp")), /*#__PURE__*/React.createElement("div", {
    className: "util__meta"
  }, /*#__PURE__*/React.createElement(Ic.Globe, {
    size: 15
  }), " Worldwide supply \xB7 EN"))), /*#__PURE__*/React.createElement("div", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container nav__row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav__brand",
    onClick: e => {
      e.preventDefault();
      go("home");
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/maxseal-logo.png",
    alt: "Max-Seal Valves & Controls"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "nav__links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav__link" + (active === "products" || active === "product" ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      go("products");
    }
  }, "Products"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav__link" + (active === "catalog" ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      go("catalog");
    }
  }, "Catalog"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav__link" + (active === "marketing" ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      go("marketing");
    }
  }, "Marketing"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "nav__link" + (active === "pricelists" ? " is-active" : ""),
    onClick: e => {
      e.preventDefault();
      go("pricelists");
    }
  }, "Pricelists")), /*#__PURE__*/React.createElement("div", {
    className: "nav__actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ms-iconbtn nav__search",
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement(Ic.Search, {
    size: 20
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Request a Quote"), /*#__PURE__*/React.createElement("button", {
    className: "nav__burger ms-iconbtn",
    "aria-label": "Menu",
    onClick: () => setOpen(!open)
  }, open ? /*#__PURE__*/React.createElement(Ic.X, {
    size: 20
  }) : /*#__PURE__*/React.createElement(Ic.Menu, {
    size: 20
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "nav__mobile"
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(n.id);
      setOpen(false);
    }
  }, n.label)), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("enquiry");
      setOpen(false);
    }
  }, "Ask the Engineers"))));
}
window.MSHeader = MSHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
/* Homepage — storytelling hero, product range, proof, applications, enquiry */
function MSHome({
  go
}) {
  const {
    Button,
    SectionHeading,
    Stat,
    Badge
  } = window.MSUI;
  const Ic = window.MSIcons;
  const D = window.MSData;
  return /*#__PURE__*/React.createElement("div", {
    className: "home"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero__copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero__eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }), "Industrial Butterfly Valves \xB7 Since 2008"), /*#__PURE__*/React.createElement("h1", {
    className: "hero__title"
  }, "Highly engineered valves, built to seal under pressure."), /*#__PURE__*/React.createElement("p", {
    className: "hero__lead"
  }, "Max-Seal designs and supplies butterfly valves and automated packages for performance, reliability, and the most demanding applications. Full technical data is available online, not just in a PDF."), /*#__PURE__*/React.createElement("div", {
    className: "hero__cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 18
    })
  }, "Request a Quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "on-dark",
    size: "lg",
    onClick: () => go("enquiry"),
    icon: /*#__PURE__*/React.createElement(Ic.Quote, {
      size: 18
    })
  }, "Ask the Engineers")), /*#__PURE__*/React.createElement("div", {
    className: "hero__trust"
  }, D.certs.slice(0, 4).map(c => /*#__PURE__*/React.createElement("span", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "hero__visual"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-valve.png",
    alt: "Engineered butterfly valve cross section",
    className: "hero__img"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero__chip hero__chip--a"
  }, /*#__PURE__*/React.createElement("b", null, "Zero leakage"), /*#__PURE__*/React.createElement("span", null, "ISO 5208 Rate A")), /*#__PURE__*/React.createElement("div", {
    className: "hero__chip hero__chip--b"
  }, /*#__PURE__*/React.createElement("b", null, "DN50\u2013DN1200"), /*#__PURE__*/React.createElement("span", null, "Size range"))))), /*#__PURE__*/React.createElement("section", {
    className: "industries"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container industries__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "industries__label"
  }, "Trusted across demanding sectors"), /*#__PURE__*/React.createElement("div", {
    className: "industries__row"
  }, D.industries.map(it => {
    const I = Ic[it.icon];
    return /*#__PURE__*/React.createElement("div", {
      key: it.label,
      className: "industries__item"
    }, /*#__PURE__*/React.createElement(I, {
      size: 20
    }), " ", it.label);
  })))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Product Range",
    title: "Seven engineered valve families",
    subtitle: "From resilient seated to triple offset, each family is built for a defined service window. Explore full specifications online."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go("products"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "View all products")), /*#__PURE__*/React.createElement("div", {
    className: "prod-grid"
  }, D.products.map(p => {
    const I = Ic[p.icon];
    return /*#__PURE__*/React.createElement("a", {
      key: p.id,
      href: "#",
      className: "ms-card ms-product",
      onClick: e => {
        e.preventDefault();
        go("product", p.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ms-product__media"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-product__badge"
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "solid"
    }, p.badge)), /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: p.name,
      loading: "lazy"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "prod-icon"
    }, /*#__PURE__*/React.createElement(I, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__title"
    }, p.name), /*#__PURE__*/React.createElement("p", {
      className: "ms-product__desc"
    }, p.tagline), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__meta"
    }, p.meta.map(([k, v], i) => /*#__PURE__*/React.createElement("span", {
      key: i
    }, k, " ", /*#__PURE__*/React.createElement("b", null, v)))), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-product__link"
    }, "View product ", /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })))));
  })))), /*#__PURE__*/React.createElement("section", {
    className: "why"
  }, /*#__PURE__*/React.createElement("div", {
    className: "why__grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container why__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "why__head"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    tone: "dark",
    eyebrow: "Why Max-Seal",
    title: "Engineering you can specify with confidence",
    subtitle: "We back every valve with complete documentation, material traceability, and engineers who answer fast."
  })), /*#__PURE__*/React.createElement("div", {
    className: "why__cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "why__points"
  }, [["ShieldCheck", "Certified and traceable", "API, ISO, and fire-safe certified, with full material test reports on request."], ["Gauge", "Built for severe service", "Metal and resilient seats rated for high pressure, vacuum, and wide temperature."], ["FileText", "Specs online, not buried", "Every product page shows complete technical data, dimensions, and documents."], ["Wrench", "Engineered to order", "Automated packages and customized solutions for non-standard conditions."]].map(([icon, t, d]) => {
    const I = Ic[icon];
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "why__point"
    }, /*#__PURE__*/React.createElement("span", {
      className: "why__icon"
    }, /*#__PURE__*/React.createElement(I, {
      size: 22
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, t), /*#__PURE__*/React.createElement("p", null, d)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "why__stats"
  }, D.stats.map(s => /*#__PURE__*/React.createElement(Stat, {
    key: s.label,
    value: s.value,
    unit: s.unit,
    label: s.label
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "appband",
    style: {
      backgroundImage: "linear-gradient(90deg, rgba(7,23,42,0.92) 0%, rgba(7,23,42,0.55) 60%, rgba(7,23,42,0.35) 100%), url(../../assets/application-band.png)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container appband__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-section-head__eyebrow",
    style: {
      color: "var(--azure-400)"
    }
  }, "Applications"), /*#__PURE__*/React.createElement("h2", {
    className: "appband__title"
  }, "From data center cooling loops to refinery shutoff"), /*#__PURE__*/React.createElement("p", {
    className: "appband__sub"
  }, "Max-Seal valves run in water, chemical, hydrocarbon, and utility service across the world. Tell us your conditions and we will match the right valve."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Ask the Engineers"))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Proven in the field",
    title: "What customers and distributors say",
    style: {
      margin: "0 auto var(--space-8)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "reviews"
  }, D.reviews.map((r, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    className: "review"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review__stars"
  }, [0, 1, 2, 3, 4].map(n => /*#__PURE__*/React.createElement(Ic.Star, {
    key: n,
    size: 15
  }))), /*#__PURE__*/React.createElement("blockquote", null, r.quote), /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement("b", null, r.name), /*#__PURE__*/React.createElement("span", null, r.org))))))), /*#__PURE__*/React.createElement("section", {
    className: "enq-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container enq-section__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "enq-section__copy"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Request a Quote",
    title: "Tell us about your application",
    subtitle: "Send your requirements and an engineer will respond within one business day."
  }), /*#__PURE__*/React.createElement("ul", {
    className: "enq-points"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Ic.Check, {
    size: 18
  }), " Sizing and material selection support"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Ic.Check, {
    size: 18
  }), " Budget and firm pricing"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Ic.Check, {
    size: 18
  }), " Lead times and stock availability")), /*#__PURE__*/React.createElement("div", {
    className: "enq-quick"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-quick__btn"
  }, /*#__PURE__*/React.createElement(Ic.Phone, {
    size: 18
  }), " Call"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-quick__btn"
  }, /*#__PURE__*/React.createElement(Ic.Mail, {
    size: 18
  }), " Email"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "enq-quick__btn enq-quick__btn--wa"
  }, /*#__PURE__*/React.createElement(Ic.Whatsapp, {
    size: 18
  }), " WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    className: "enq-section__form"
  }, /*#__PURE__*/React.createElement(window.MSEnquiryForm, {
    compact: true
  })))));
}
window.MSHome = MSHome;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductDetail.jsx
try { (() => {
/* Product detail — full technical information online */
function MSProductDetail({
  id,
  go
}) {
  const {
    Button,
    Badge,
    SpecTable,
    Stat
  } = window.MSUI;
  const Ic = window.MSIcons;
  const D = window.MSData;
  const p = D.products.find(x => x.id === id) || D.products[0];
  const [tab, setTab] = React.useState("overview");
  const [zoom, setZoom] = React.useState(false);
  const related = D.products.filter(x => x.id !== p.id).slice(0, 3);
  const specRows = [["Size range", p.size], ["Pressure rating", p.rating], ["Temperature", p.temp], ["Seat material", p.seat], ["Body material", p.body], ["Seat leakage", p.leak], ["Face-to-face", "ISO 5752 / API 609"], ["Top flange", "ISO 5211"]];
  const docs = [["Technical data sheet", "PDF · 2.4 MB"], ["Dimensional drawing", "PDF · 1.1 MB"], ["Installation & maintenance manual", "PDF · 3.0 MB"], ["Material test certificate (sample)", "PDF · 0.6 MB"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("home");
    }
  }, "Home"), /*#__PURE__*/React.createElement(Ic.ChevronRight, {
    size: 14
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("products");
    }
  }, "Products"), /*#__PURE__*/React.createElement(Ic.ChevronRight, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, p.name)), /*#__PURE__*/React.createElement("div", {
    className: "pd-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-media" + (zoom ? " is-zoom" : ""),
    onMouseMove: e => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", (e.clientX - r.left) / r.width * 100 + "%");
      e.currentTarget.style.setProperty("--my", (e.clientY - r.top) / r.height * 100 + "%");
    },
    onMouseEnter: () => setZoom(true),
    onMouseLeave: () => setZoom(false)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-product__badge"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, p.badge)), /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: p.name
  }), /*#__PURE__*/React.createElement("span", {
    className: "pd-zoom-hint"
  }, /*#__PURE__*/React.createElement(Ic.Maximize, {
    size: 15
  }), " Hover to zoom")), /*#__PURE__*/React.createElement("div", {
    className: "pd-intro"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-section-head__eyebrow"
  }, p.badge, " Series"), /*#__PURE__*/React.createElement("h1", {
    className: "pd-title"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "pd-lead"
  }, p.tagline), /*#__PURE__*/React.createElement("div", {
    className: "pd-keyspecs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Size"), /*#__PURE__*/React.createElement("b", null, p.size)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Rating"), /*#__PURE__*/React.createElement("b", null, p.rating)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Temp"), /*#__PURE__*/React.createElement("b", null, p.temp)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Seat"), /*#__PURE__*/React.createElement("b", null, p.seat))), /*#__PURE__*/React.createElement("div", {
    className: "pd-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Request a Quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go("enquiry"),
    icon: /*#__PURE__*/React.createElement(Ic.Quote, {
      size: 16
    })
  }, "Ask the Engineers"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: /*#__PURE__*/React.createElement(Ic.Download, {
      size: 16
    })
  }, "Data sheet")))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container pd-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-tabs",
    role: "tablist"
  }, [["overview", "Overview"], ["specs", "Technical Data"], ["apps", "Applications"], ["docs", "Documents"]].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    role: "tab",
    className: "ms-tab",
    "aria-selected": tab === k,
    onClick: () => setTab(k)
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "pd-panel"
  }, tab === "overview" && /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, /*#__PURE__*/React.createElement("p", null, "The ", p.name, " is designed for ", p.apps[0].toLowerCase(), " and similar service. It combines a proven body design with seat and material options matched to your media, pressure, and temperature."), /*#__PURE__*/React.createElement("p", null, "Every valve ships with complete documentation. The data on this page reflects the standard build. For non-standard conditions, our engineers can configure a customized solution."), /*#__PURE__*/React.createElement("div", {
    className: "pd-features"
  }, [["ShieldCheck", "Certified construction", "API 609 / ISO 9001"], ["Gauge", "Tested shutoff", p.leak], ["Layers", "Material options", p.body]].map(([ic, t, d]) => {
    const I = Ic[ic];
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      className: "pd-feature"
    }, /*#__PURE__*/React.createElement("span", {
      className: "pd-feature__ic"
    }, /*#__PURE__*/React.createElement(I, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, t), /*#__PURE__*/React.createElement("span", null, d)));
  }))), tab === "specs" && /*#__PURE__*/React.createElement(SpecTable, {
    caption: "Standard technical data",
    rows: specRows
  }), tab === "apps" && /*#__PURE__*/React.createElement("div", {
    className: "pd-apps"
  }, /*#__PURE__*/React.createElement("p", {
    className: "prose"
  }, "Typical applications for the ", p.badge.toLowerCase(), " range:"), /*#__PURE__*/React.createElement("div", {
    className: "pd-appgrid"
  }, p.apps.map(a => /*#__PURE__*/React.createElement("div", {
    key: a,
    className: "pd-appitem"
  }, /*#__PURE__*/React.createElement(Ic.Check, {
    size: 16
  }), " ", a)))), tab === "docs" && /*#__PURE__*/React.createElement("ul", {
    className: "doc-list"
  }, docs.map(([t, m]) => /*#__PURE__*/React.createElement("li", {
    key: t
  }, /*#__PURE__*/React.createElement("span", {
    className: "doc-list__ic"
  }, /*#__PURE__*/React.createElement(Ic.FileText, {
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "doc-list__t"
  }, t, /*#__PURE__*/React.createElement("em", null, m)), /*#__PURE__*/React.createElement("button", {
    className: "ms-iconbtn",
    "aria-label": "Download " + t
  }, /*#__PURE__*/React.createElement(Ic.Download, {
    size: 18
  }))))))), /*#__PURE__*/React.createElement("aside", {
    className: "pd-aside"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-card"
  }, /*#__PURE__*/React.createElement("h4", null, "Request this valve"), /*#__PURE__*/React.createElement("p", null, "Get firm pricing, lead time, and material options for the ", p.name, "."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Request a Quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    onClick: () => go("enquiry")
  }, "Ask the Engineers"), /*#__PURE__*/React.createElement("div", {
    className: "pd-quick"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement(Ic.Phone, {
    size: 16
  }), " Call"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, /*#__PURE__*/React.createElement(Ic.Mail, {
    size: 16
  }), " Email"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "is-wa"
  }, /*#__PURE__*/React.createElement(Ic.Whatsapp, {
    size: 16
  }), " WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    className: "pd-card pd-card--plain"
  }, /*#__PURE__*/React.createElement("h4", null, "At a glance"), /*#__PURE__*/React.createElement(SpecTable, {
    rows: [["Series", p.badge], ["Size", p.size], ["Rating", p.rating], ["Seat", p.seat]]
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "rel-title"
  }, "Related products"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("products"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "All products")), /*#__PURE__*/React.createElement("div", {
    className: "prod-grid prod-grid--3"
  }, related.map(r => /*#__PURE__*/React.createElement("a", {
    key: r.id,
    href: "#",
    className: "ms-card ms-product",
    onClick: e => {
      e.preventDefault();
      go("product", r.id);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-product__media"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-product__badge"
  }, /*#__PURE__*/React.createElement(Badge, {
    variant: "solid"
  }, r.badge)), /*#__PURE__*/React.createElement("img", {
    src: r.image,
    alt: r.name,
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ms-product__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ms-product__title"
  }, r.name), /*#__PURE__*/React.createElement("p", {
    className: "ms-product__desc"
  }, r.tagline), /*#__PURE__*/React.createElement("div", {
    className: "ms-product__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms-product__link"
  }, "View product ", /*#__PURE__*/React.createElement(Ic.ArrowRight, {
    size: 16
  }))))))))));
}
window.MSProductDetail = MSProductDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Products.jsx
try { (() => {
/* Products category listing with filter chips */
function MSProducts({
  go
}) {
  const {
    SectionHeading,
    Badge,
    Button
  } = window.MSUI;
  const Ic = window.MSIcons;
  const D = window.MSData;
  const filters = ["All", "Resilient Seated", "High Performance", "Triple Offset", "PFA Lined", "Special Alloy", "Automated", "Custom"];
  const [active, setActive] = React.useState("All");
  const list = active === "All" ? D.products : D.products.filter(p => p.badge === active);
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero__grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("home");
    }
  }, "Home"), /*#__PURE__*/React.createElement(Ic.ChevronRight, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Products")), /*#__PURE__*/React.createElement("h1", {
    className: "page-hero__title"
  }, "Butterfly valves engineered for every service window"), /*#__PURE__*/React.createElement("p", {
    className: "page-hero__sub"
  }, "Browse the full Max-Seal range. Each product page carries complete technical data, dimensions, applications, and downloadable documents."))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filters"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f,
    className: "ms-tag" + (active === f ? " is-on" : ""),
    "aria-pressed": active === f,
    onClick: () => setActive(f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    className: "prod-grid prod-grid--page"
  }, list.map(p => {
    const I = Ic[p.icon];
    return /*#__PURE__*/React.createElement("a", {
      key: p.id,
      href: "#",
      className: "ms-card ms-product",
      onClick: e => {
        e.preventDefault();
        go("product", p.id);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "ms-product__media"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-product__badge"
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "solid"
    }, p.badge)), /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: p.name,
      loading: "lazy"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "prod-icon"
    }, /*#__PURE__*/React.createElement(I, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__title"
    }, p.name), /*#__PURE__*/React.createElement("p", {
      className: "ms-product__desc"
    }, p.tagline), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__meta"
    }, p.meta.map(([k, v], i) => /*#__PURE__*/React.createElement("span", {
      key: i
    }, k, " ", /*#__PURE__*/React.createElement("b", null, v)))), /*#__PURE__*/React.createElement("div", {
      className: "ms-product__foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ms-product__link"
    }, "View product ", /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })))));
  })))), /*#__PURE__*/React.createElement(window.MSCallout, {
    go: go
  }));
}
window.MSProducts = MSProducts;

/* Reusable callout band */
function MSCallout({
  go
}) {
  const {
    Button
  } = window.MSUI;
  const Ic = window.MSIcons;
  return /*#__PURE__*/React.createElement("section", {
    className: "callout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container callout__inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Not sure which valve fits your application?"), /*#__PURE__*/React.createElement("p", null, "Send your conditions and our engineers will recommend the right size, seat, and material.")), /*#__PURE__*/React.createElement("div", {
    className: "callout__actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go("enquiry"),
    iconRight: /*#__PURE__*/React.createElement(Ic.ArrowRight, {
      size: 16
    })
  }, "Request a Quote"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go("enquiry")
  }, "Ask the Engineers"))));
}
window.MSCallout = MSCallout;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Products.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Resources.jsx
try { (() => {
/* Catalog / Marketing / Pricelists — three separate resource areas */
function MSResources({
  kind,
  go
}) {
  const {
    Button,
    Badge
  } = window.MSUI;
  const Ic = window.MSIcons;
  const D = window.MSData;
  const cfg = {
    catalog: {
      crumb: "Catalog",
      eyebrow: "Catalog",
      title: "Product catalogs and data sheets",
      sub: "Download the full Max-Seal range, series brochures, and technical data sheets. Everything here is also available as live technical data on each product page.",
      items: D.catalogs.map(c => ({
        ...c
      })),
      cols: 2
    },
    marketing: {
      crumb: "Marketing",
      eyebrow: "Marketing",
      title: "Marketing resources for distributors",
      sub: "Brand assets, product imagery, and presentation material for Max-Seal distributors and partners. Use these to promote the range in your market.",
      items: [{
        title: "Max-Seal Logo Pack",
        size: "3.2 MB",
        kind: "ZIP",
        desc: "Logo in PNG, SVG, and EPS for print and web."
      }, {
        title: "Product Image Library",
        size: "48 MB",
        kind: "ZIP",
        desc: "High-resolution product photography for all valve families."
      }, {
        title: "Company Presentation 2026",
        size: "9.1 MB",
        kind: "PPTX",
        desc: "Editable overview deck for customer meetings."
      }, {
        title: "Trade Show Banner Set",
        size: "22 MB",
        kind: "PDF",
        desc: "Print-ready pull-up banner artwork."
      }, {
        title: "Capability Statement",
        size: "1.8 MB",
        kind: "PDF",
        desc: "One-page summary of products and certifications."
      }, {
        title: "Social Media Kit",
        size: "14 MB",
        kind: "ZIP",
        desc: "Sized images and copy for distributor channels."
      }],
      cols: 3
    },
    pricelists: {
      crumb: "Pricelists",
      eyebrow: "Pricelists",
      title: "Current price lists",
      sub: "Distributor price lists by product family, with effective dates. Sign in to your distributor account to view net pricing, or request access.",
      gated: true,
      items: [{
        title: "Resilient Seated Price List",
        size: "0.9 MB",
        kind: "PDF",
        desc: "Effective 01 Jan 2026 · List pricing."
      }, {
        title: "High Performance Price List",
        size: "1.1 MB",
        kind: "PDF",
        desc: "Effective 01 Jan 2026 · List pricing."
      }, {
        title: "Triple Offset Price List",
        size: "1.0 MB",
        kind: "PDF",
        desc: "Effective 01 Jan 2026 · List pricing."
      }, {
        title: "Automation Packages Price List",
        size: "0.8 MB",
        kind: "PDF",
        desc: "Effective 01 Jan 2026 · List pricing."
      }],
      cols: 2
    }
  }[kind];
  return /*#__PURE__*/React.createElement("div", {
    className: "page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-hero__grid",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "crumbs"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("home");
    }
  }, "Home"), /*#__PURE__*/React.createElement(Ic.ChevronRight, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, cfg.crumb)), /*#__PURE__*/React.createElement("h1", {
    className: "page-hero__title"
  }, cfg.title), /*#__PURE__*/React.createElement("p", {
    className: "page-hero__sub"
  }, cfg.sub), cfg.gated && /*#__PURE__*/React.createElement("div", {
    className: "gate"
  }, /*#__PURE__*/React.createElement(Ic.ShieldCheck, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Net pricing is for approved distributors."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => go("enquiry")
  }, "Request distributor access")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-grid res-grid--" + cfg.cols
  }, cfg.items.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.title,
    className: "ms-card res-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "res-item__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "res-item__file"
  }, /*#__PURE__*/React.createElement(Ic.FileText, {
    size: 22
  })), /*#__PURE__*/React.createElement(Badge, null, d.kind)), /*#__PURE__*/React.createElement("h4", {
    className: "res-item__title"
  }, d.title), /*#__PURE__*/React.createElement("p", {
    className: "res-item__desc"
  }, d.desc), /*#__PURE__*/React.createElement("div", {
    className: "res-item__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "res-item__size"
  }, d.size), /*#__PURE__*/React.createElement("button", {
    className: "ms-btn ms-btn--outline ms-btn--sm"
  }, /*#__PURE__*/React.createElement(Ic.Download, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Download")))))))), /*#__PURE__*/React.createElement(window.MSCallout, {
    go: go
  }));
}
window.MSResources = MSResources;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Resources.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.jsx
try { (() => {
/* Max-Seal website demo data */
(function () {
  const A = "../../assets/";
  window.MSData = {
    nav: [{
      id: "products",
      label: "Products"
    }, {
      id: "catalog",
      label: "Catalog"
    }, {
      id: "marketing",
      label: "Marketing"
    }, {
      id: "pricelists",
      label: "Pricelists"
    }],
    contact: {
      phone: "+1 (713) 555 0140",
      email: "sales@max-seal.com",
      whatsapp: "+1 713 555 0142"
    },
    products: [{
      id: "resilient-seated",
      name: "Resilient Seated Butterfly Valves",
      icon: "Droplet",
      badge: "Resilient Seated",
      image: A + "product-resilient-seated.png",
      tagline: "Reliable bubble-tight shutoff for clean and lightly contaminated media.",
      meta: [["Size", "DN40–600"], ["Rating", "PN16"]],
      size: "DN40–DN600",
      rating: "PN10–PN16",
      temp: "−20 to 120 °C",
      seat: "EPDM / NBR",
      body: "Ductile iron / stainless",
      leak: "Bubble-tight",
      apps: ["Water treatment", "HVAC", "Food & beverage", "General process"]
    }, {
      id: "high-performance",
      name: "High Performance Butterfly Valves",
      icon: "Gauge",
      badge: "High Performance",
      image: A + "product-high-performance.png",
      tagline: "Double offset design for higher pressure and tighter shutoff.",
      meta: [["Size", "DN50–900"], ["Rating", "PN50"]],
      size: "DN50–DN900",
      rating: "PN10–PN50 / 150–600#",
      temp: "−46 to 230 °C",
      seat: "RPTFE / metal",
      body: "WCB / CF8M",
      leak: "ISO 5208 Rate A",
      apps: ["Oil & gas", "Chemical", "Refining", "Power"]
    }, {
      id: "triple-offset",
      name: "Triple Offset Butterfly Valves",
      icon: "Layers",
      badge: "Triple Offset",
      image: A + "product-triple-offset.png",
      tagline: "Metal-seated, bidirectional, zero-leakage shutoff for severe service.",
      meta: [["Size", "DN50–1200"], ["Rating", "PN40"]],
      size: "DN50–DN1200",
      rating: "PN10–PN40 / 150–300#",
      temp: "−46 to 425 °C",
      seat: "Laminated metal",
      body: "WCB / CF8M / Duplex",
      leak: "ISO 5208 Rate A",
      apps: ["Refining", "Petrochemical", "Power", "Marine"]
    }, {
      id: "pfa-lined",
      name: "PFA Lined Butterfly Valves",
      icon: "FlaskConical",
      badge: "PFA Lined",
      image: A + "product-pfa-lined.png",
      tagline: "Full PFA lining for aggressive and corrosive chemical media.",
      meta: [["Size", "DN50–600"], ["Rating", "PN16"]],
      size: "DN50–DN600",
      rating: "PN10–PN16",
      temp: "−20 to 180 °C",
      seat: "PFA",
      body: "Ductile iron, PFA lined",
      leak: "Bubble-tight",
      apps: ["Chemical processing", "Pharmaceuticals", "Pulp & paper"]
    }, {
      id: "special-alloy",
      name: "Special Alloy Butterfly Valves",
      icon: "ShieldCheck",
      badge: "Special Alloy",
      image: A + "product-special-alloy.png",
      tagline: "Hastelloy, titanium, and duplex bodies for extreme corrosion.",
      meta: [["Size", "DN50–900"], ["Rating", "PN40"]],
      size: "DN50–DN900",
      rating: "PN10–PN40 / 150–300#",
      temp: "−196 to 540 °C",
      seat: "Metal / RPTFE",
      body: "Hastelloy / Titanium / Duplex",
      leak: "ISO 5208 Rate A",
      apps: ["Marine", "Mining", "Petrochemical", "Power"]
    }, {
      id: "automated",
      name: "Automated Packages",
      icon: "Settings",
      badge: "Automated",
      image: A + "product-automated.png",
      tagline: "Valves assembled with pneumatic or electric actuation and controls.",
      meta: [["Drive", "Pneumatic / electric"], ["Control", "ISO 5211"]],
      size: "DN40–DN1200",
      rating: "Per base valve",
      temp: "Per base valve",
      seat: "Per base valve",
      body: "Actuator + valve assembly",
      leak: "Per base valve",
      apps: ["Process automation", "Data centers", "Water", "HVAC"]
    }, {
      id: "customized",
      name: "Customized Solutions",
      icon: "Wrench",
      badge: "Custom",
      image: A + "product-customized.png",
      tagline: "Engineered-to-order valves for non-standard service conditions.",
      meta: [["Lead", "Engineered"], ["Scope", "Made to order"]],
      size: "On request",
      rating: "On request",
      temp: "On request",
      seat: "On request",
      body: "Engineered to spec",
      leak: "On request",
      apps: ["Special service", "Retrofit", "OEM"]
    }],
    industries: [{
      icon: "Database",
      label: "Data centers"
    }, {
      icon: "Factory",
      label: "Oil & gas"
    }, {
      icon: "FlaskConical",
      label: "Chemical"
    }, {
      icon: "Droplet",
      label: "Water & wastewater"
    }, {
      icon: "Wind",
      label: "HVAC"
    }, {
      icon: "Zap",
      label: "Power"
    }, {
      icon: "Ship",
      label: "Marine"
    }, {
      icon: "Layers",
      label: "Pulp & paper"
    }],
    certs: ["API 609", "ISO 9001", "ISO 15848", "API 598", "CE / PED", "Fire-safe API 607"],
    stats: [{
      value: "2008",
      label: "Established"
    }, {
      value: "DN1200",
      label: "Max valve size"
    }, {
      value: "40",
      unit: "+",
      label: "Countries served"
    }, {
      value: "7",
      label: "Valve families"
    }],
    enquiryOptions: ["Request a quote", "Technical question", "Catalog request", "Price list request", "Distributor enquiry", "Other"],
    countries: ["United States", "Canada", "Mexico", "Germany", "United Kingdom", "United Arab Emirates", "India", "Singapore", "Australia", "Other"],
    catalogs: [{
      title: "Master Product Catalog 2026",
      size: "12.4 MB",
      kind: "PDF",
      desc: "Full butterfly valve range, dimensions, and materials."
    }, {
      title: "Triple Offset Series Brochure",
      size: "4.1 MB",
      kind: "PDF",
      desc: "Triple offset valve construction and applications."
    }, {
      title: "Resilient Seated Data Sheet",
      size: "2.8 MB",
      kind: "PDF",
      desc: "Sizes, ratings, and seat options for resilient seated valves."
    }, {
      title: "Actuation & Automation Guide",
      size: "3.6 MB",
      kind: "PDF",
      desc: "Pneumatic and electric package selection."
    }],
    reviews: [{
      quote: "Max-Seal delivered triple offset valves on a tight refinery turnaround and the documentation was complete on day one.",
      name: "Process Engineering Lead",
      org: "Gulf Coast Refining"
    }, {
      quote: "Their engineers answered our sizing questions within hours. The valves have run without a seat issue for two years.",
      name: "Maintenance Manager",
      org: "Midwest Chemical"
    }, {
      quote: "As a distributor we rely on clear pricelists and stock. Max-Seal is consistent on both.",
      name: "Procurement Director",
      org: "Industrial Valve Supply"
    }]
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.jsx
try { (() => {
/* Max-Seal icon set — Lucide-style line icons (2px stroke, round caps).
   Self-contained inline SVGs so screens render without a CDN race.
   Exposed on window for the babel screen scripts. */
(function () {
  const S = ({
    children,
    size = 20,
    sw = 2,
    ...p
  }) => React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...p
  }, children);
  const L = (...d) => d.map((el, i) => React.createElement(el[0], {
    key: i,
    ...el[1]
  }));
  const Icons = {
    ArrowRight: p => S({
      ...p,
      children: L(["line", {
        x1: 5,
        y1: 12,
        x2: 19,
        y2: 12
      }], ["polyline", {
        points: "12 5 19 12 12 19"
      }])
    }),
    ArrowUpRight: p => S({
      ...p,
      children: L(["line", {
        x1: 7,
        y1: 17,
        x2: 17,
        y2: 7
      }], ["polyline", {
        points: "7 7 17 7 17 17"
      }])
    }),
    ChevronRight: p => S({
      ...p,
      children: L(["polyline", {
        points: "9 18 15 12 9 6"
      }])
    }),
    ChevronDown: p => S({
      ...p,
      children: L(["polyline", {
        points: "6 9 12 15 18 9"
      }])
    }),
    Search: p => S({
      ...p,
      children: L(["circle", {
        cx: 11,
        cy: 11,
        r: 8
      }], ["line", {
        x1: 21,
        y1: 21,
        x2: 16.65,
        y2: 16.65
      }])
    }),
    Menu: p => S({
      ...p,
      children: L(["line", {
        x1: 3,
        y1: 6,
        x2: 21,
        y2: 6
      }], ["line", {
        x1: 3,
        y1: 12,
        x2: 21,
        y2: 12
      }], ["line", {
        x1: 3,
        y1: 18,
        x2: 21,
        y2: 18
      }])
    }),
    X: p => S({
      ...p,
      children: L(["line", {
        x1: 18,
        y1: 6,
        x2: 6,
        y2: 18
      }], ["line", {
        x1: 6,
        y1: 6,
        x2: 18,
        y2: 18
      }])
    }),
    Phone: p => S({
      ...p,
      children: L(["path", {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
      }])
    }),
    Mail: p => S({
      ...p,
      children: L(["rect", {
        x: 2,
        y: 4,
        width: 20,
        height: 16,
        rx: 2
      }], ["path", {
        d: "m22 7-10 6L2 7"
      }])
    }),
    Whatsapp: p => S({
      ...p,
      children: L(["path", {
        d: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.94L3 21l1.94-5.6A8.5 8.5 0 1 1 21 11.5z"
      }], ["path", {
        d: "M8.5 8.8c.3-.2.7-.2.9.1l.8 1.2c.2.3.1.6-.1.8l-.5.5c.5 1 1.3 1.8 2.3 2.3l.5-.5c.2-.2.5-.3.8-.1l1.2.8c.3.2.3.6.1.9-.6.8-1.7 1.1-2.8.7a7 7 0 0 1-4-4c-.4-1.1-.1-2.2.6-2.9z"
      }])
    }),
    Download: p => S({
      ...p,
      children: L(["path", {
        d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }], ["polyline", {
        points: "7 10 12 15 17 10"
      }], ["line", {
        x1: 12,
        y1: 15,
        x2: 12,
        y2: 3
      }])
    }),
    FileText: p => S({
      ...p,
      children: L(["path", {
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }], ["polyline", {
        points: "14 2 14 8 20 8"
      }], ["line", {
        x1: 16,
        y1: 13,
        x2: 8,
        y2: 13
      }], ["line", {
        x1: 16,
        y1: 17,
        x2: 8,
        y2: 17
      }])
    }),
    Check: p => S({
      ...p,
      children: L(["polyline", {
        points: "20 6 9 17 4 12"
      }])
    }),
    Plus: p => S({
      ...p,
      children: L(["line", {
        x1: 12,
        y1: 5,
        x2: 12,
        y2: 19
      }], ["line", {
        x1: 5,
        y1: 12,
        x2: 19,
        y2: 12
      }])
    }),
    Globe: p => S({
      ...p,
      children: L(["circle", {
        cx: 12,
        cy: 12,
        r: 10
      }], ["line", {
        x1: 2,
        y1: 12,
        x2: 22,
        y2: 12
      }], ["path", {
        d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      }])
    }),
    MapPin: p => S({
      ...p,
      children: L(["path", {
        d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
      }], ["circle", {
        cx: 12,
        cy: 10,
        r: 3
      }])
    }),
    ShieldCheck: p => S({
      ...p,
      children: L(["path", {
        d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      }], ["polyline", {
        points: "9 12 11 14 15 10"
      }])
    }),
    Gauge: p => S({
      ...p,
      children: L(["path", {
        d: "M12 14 16 9"
      }], ["path", {
        d: "M3.5 14a9 9 0 1 1 17 0"
      }], ["circle", {
        cx: 12,
        cy: 14,
        r: 1.5
      }])
    }),
    Settings: p => S({
      ...p,
      children: L(["circle", {
        cx: 12,
        cy: 12,
        r: 3
      }], ["path", {
        d: "M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H1a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 2.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 2.6h.1A1.7 1.7 0 0 0 10.3 1 2 2 0 1 1 14 1v.1a1.7 1.7 0 0 0 1.2 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1.2H23a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.2z"
      }])
    }),
    Layers: p => S({
      ...p,
      children: L(["polygon", {
        points: "12 2 2 7 12 12 22 7 12 2"
      }], ["polyline", {
        points: "2 17 12 22 22 17"
      }], ["polyline", {
        points: "2 12 12 17 22 12"
      }])
    }),
    Droplet: p => S({
      ...p,
      children: L(["path", {
        d: "M12 2.7s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10z"
      }])
    }),
    Factory: p => S({
      ...p,
      children: L(["path", {
        d: "M2 20h20"
      }], ["path", {
        d: "M3 20V9l5 3V9l5 3V9l5 3v8"
      }], ["path", {
        d: "M8 20v-4"
      }], ["path", {
        d: "M13 20v-4"
      }])
    }),
    Wind: p => S({
      ...p,
      children: L(["path", {
        d: "M9.6 4.6A2 2 0 1 1 11 8H2"
      }], ["path", {
        d: "M12.6 19.4A2 2 0 1 0 14 16H2"
      }], ["path", {
        d: "M17.7 7.7A2.5 2.5 0 1 1 19.5 12H2"
      }])
    }),
    Zap: p => S({
      ...p,
      children: L(["polygon", {
        points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
      }])
    }),
    Ship: p => S({
      ...p,
      children: L(["path", {
        d: "M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
      }], ["path", {
        d: "M19.4 14 21 9H3l1.6 5"
      }], ["path", {
        d: "M12 10V4"
      }], ["path", {
        d: "M5 9V6l7-3 7 3v3"
      }])
    }),
    FlaskConical: p => S({
      ...p,
      children: L(["path", {
        d: "M9 3v6.5L4.5 17a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L15 9.5V3"
      }], ["path", {
        d: "M8 3h8"
      }], ["path", {
        d: "M7 15h10"
      }])
    }),
    Wrench: p => S({
      ...p,
      children: L(["path", {
        d: "M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.7 2.7-2.3-.6-.6-2.3 2.9-2.5z"
      }])
    }),
    Quote: p => S({
      ...p,
      children: L(["path", {
        d: "M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4"
      }], ["path", {
        d: "M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4"
      }])
    }),
    Star: p => S({
      ...p,
      children: L(["polygon", {
        points: "12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.7 5.8 21 7 14.1 2 9.3 8.9 8.3 12 2"
      }])
    }),
    Database: p => S({
      ...p,
      children: L(["ellipse", {
        cx: 12,
        cy: 5,
        rx: 9,
        ry: 3
      }], ["path", {
        d: "M3 5v14a9 3 0 0 0 18 0V5"
      }], ["path", {
        d: "M3 12a9 3 0 0 0 18 0"
      }])
    }),
    Maximize: p => S({
      ...p,
      children: L(["path", {
        d: "M8 3H5a2 2 0 0 0-2 2v3"
      }], ["path", {
        d: "M21 8V5a2 2 0 0 0-2-2h-3"
      }], ["path", {
        d: "M3 16v3a2 2 0 0 0 2 2h3"
      }], ["path", {
        d: "M16 21h3a2 2 0 0 0 2-2v-3"
      }])
    })
  };
  window.MSIcons = Icons;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
/* Local thin primitives for the UI kit — mirror the design-system
   ms-* classes so screens render without the async bundle. In production
   React these map 1:1 to window.MaxSealDesignSystem_* components. */
(function () {
  const I = () => window.MSIcons;
  function Button({
    variant = "primary",
    size = "md",
    block,
    href,
    icon,
    iconRight,
    onClick,
    children,
    ...rest
  }) {
    const cls = ["ms-btn", `ms-btn--${variant}`, size !== "md" && `ms-btn--${size}`, block && "ms-btn--block"].filter(Boolean).join(" ");
    const inner = React.createElement(React.Fragment, null, icon, children && React.createElement("span", null, children), iconRight);
    if (href !== undefined) return React.createElement("a", {
      className: cls,
      href,
      onClick,
      ...rest
    }, inner);
    return React.createElement("button", {
      className: cls,
      onClick,
      ...rest
    }, inner);
  }
  function Eyebrow({
    children,
    dark
  }) {
    return React.createElement("span", {
      className: "ms-section-head__eyebrow",
      style: dark ? {
        color: "var(--azure-400)"
      } : null
    }, children);
  }
  function SectionHeading({
    eyebrow,
    title,
    subtitle,
    tone = "light",
    align = "left",
    style
  }) {
    const cls = ["ms-section-head", tone === "dark" && "ms-section-head--dark", align === "center" && "ms-section-head--center"].filter(Boolean).join(" ");
    return React.createElement("div", {
      className: cls,
      style
    }, eyebrow && React.createElement("span", {
      className: "ms-section-head__eyebrow"
    }, eyebrow), title && React.createElement("h2", {
      className: "ms-section-head__title"
    }, title), subtitle && React.createElement("p", {
      className: "ms-section-head__sub"
    }, subtitle));
  }
  function Badge({
    variant = "default",
    dot,
    children
  }) {
    const cls = ["ms-badge", variant !== "default" && `ms-badge--${variant}`].filter(Boolean).join(" ");
    return React.createElement("span", {
      className: cls
    }, dot && React.createElement("span", {
      className: "ms-dot"
    }), children);
  }
  function Field({
    label,
    required,
    type = "text",
    as,
    children,
    ...rest
  }) {
    const id = label ? label.toLowerCase().replace(/[^a-z0-9]+/g, "-") : undefined;
    const lab = label && React.createElement("label", {
      className: "ms-label",
      htmlFor: id
    }, label, required && React.createElement("span", {
      className: "ms-req"
    }, "*"));
    let control;
    if (as === "textarea") control = React.createElement("textarea", {
      id,
      className: "ms-textarea",
      rows: 5,
      ...rest
    });else if (as === "select") control = React.createElement("select", {
      id,
      className: "ms-select",
      defaultValue: "",
      ...rest
    }, children);else control = React.createElement("input", {
      id,
      className: "ms-input",
      type,
      ...rest
    });
    return React.createElement("div", {
      className: "ms-field"
    }, lab, control);
  }
  function SpecTable({
    caption,
    rows
  }) {
    return React.createElement("table", {
      className: "ms-spec"
    }, caption && React.createElement("caption", null, caption), React.createElement("tbody", null, rows.map(([k, v], i) => React.createElement("tr", {
      key: i
    }, React.createElement("th", {
      scope: "row"
    }, k), React.createElement("td", null, v)))));
  }
  function Stat({
    value,
    unit,
    label
  }) {
    return React.createElement("div", {
      className: "ms-stat"
    }, React.createElement("div", {
      className: "ms-stat__value"
    }, value, unit && React.createElement("span", {
      className: "ms-unit"
    }, unit)), React.createElement("div", {
      className: "ms-stat__label"
    }, label));
  }
  window.MSUI = {
    Button,
    Eyebrow,
    SectionHeading,
    Badge,
    Field,
    SpecTable,
    Stat
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();

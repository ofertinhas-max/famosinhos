import {u as i, a as r, j as n} from "./index-Z_n8MByG.js";
function p() {
    const t = i()
      , e = r()
      , o = [{
        path: "/painelad/order-bumps",
        nome: "Order Bumps",
        icone: "fa-gift"
    }, {
        path: "/painelad/regras-carrinho",
        nome: "Vendas em Atacado",
        icone: "fa-cart-shopping"
    }, {
        path: "/painelad/brinde",
        nome: "Brinde",
        icone: "fa-star"
    }, {
        path: "/painelad/frete",
        nome: "Frete",
        icone: "fa-truck"
    }, {
        path: "/painelad/taxas",
        nome: "Upsells",
        icone: "fa-receipt"
    }];
    return n.jsx("div", {
        style: {
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            background: "white",
            padding: "12px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        },
        children: o.map(a => n.jsxs("button", {
            onClick: () => t(a.path),
            style: {
                flex: 1,
                padding: "12px 16px",
                background: e.pathname === a.path ? "#1a1a1a" : "transparent",
                color: e.pathname === a.path ? "white" : "#666",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
            },
            children: [n.jsx("i", {
                className: `fa-solid ${a.icone}`
            }), a.nome]
        }, a.path))
    })
}
export {p as O};

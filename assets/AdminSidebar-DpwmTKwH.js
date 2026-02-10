import {a as l, u as p, j as a, L as c} from "./index-Z_n8MByG.js";
function h() {
    const i = l()
      , s = p()
      , d = () => {
        localStorage.removeItem("app_state"),
        s("/painelad")
    }
      , e = [{
        items: [{
            path: "/painelad/dashboard",
            label: "Dashboard",
            icon: "fa-solid fa-chart-line"
        }, {
            path: "/painelad/analise",
            label: "Análise",
            icon: "fa-solid fa-chart-pie"
        }]
    }, {
        items: [{
            path: "/painelad/vendas",
            label: "Vendas",
            icon: "fa-solid fa-shopping-cart"
        }, {
            path: "/painelad/carrinhos-abandonados",
            label: "Abandonados",
            icon: "fa-solid fa-cart-arrow-down"
        }]
    }, {
        items: [{
            path: "/painelad/produtos",
            label: "Produtos",
            icon: "fa-solid fa-box"
        }, {
            path: "/painelad/categorias",
            label: "Categorias",
            icon: "fa-solid fa-tags"
        }, {
            path: "/painelad/order-bumps",
            label: "Regras",
            icon: "fa-solid fa-list-check"
        }, {
            path: "/painelad/edicoes-massa",
            label: "Edições em Massa",
            icon: "fa-solid fa-pen-to-square"
        }]
    }, {
        items: [{
            path: "/painelad/pixels",
            label: "Pixels & Scripts",
            icon: "fa-solid fa-code"
        }, {
            path: "/painelad/configuracoes",
            label: "Configurações",
            icon: "fa-solid fa-gear"
        }]
    }];
    return a.jsxs("div", {
        style: {
            width: "250px",
            background: "#1a1a1a",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            display: "flex",
            flexDirection: "column"
        },
        children: [a.jsx("div", {
            style: {
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "20px 20px 0 20px",
                flexShrink: 0
            },
            children: "Admin Loja"
        }), a.jsxs("nav", {
            className: "admin-sidebar-nav",
            style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "20px",
                marginTop: "20px"
            },
            children: [e.map( (r, o) => a.jsxs("div", {
                children: [r.items.map(n => {
                    const t = n.path === "/painelad/order-bumps" ? ["/painelad/order-bumps", "/painelad/regras-carrinho", "/painelad/brinde", "/painelad/frete", "/painelad/taxas"].includes(i.pathname) : i.pathname === n.path;
                    return a.jsxs(c, {
                        to: n.path,
                        style: {
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 16px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            textDecoration: "none",
                            color: t ? "#fff" : "#999",
                            background: t ? "#333" : "transparent",
                            transition: "all 0.2s"
                        },
                        children: [a.jsx("i", {
                            className: n.icon,
                            style: {
                                fontSize: "18px",
                                width: "20px",
                                textAlign: "center"
                            }
                        }), a.jsx("span", {
                            style: {
                                fontSize: "14px",
                                fontWeight: "500"
                            },
                            children: n.label
                        })]
                    }, n.path)
                }
                ), o < e.length - 1 && a.jsx("div", {
                    style: {
                        height: "1px",
                        background: "#333",
                        margin: "16px 0"
                    }
                })]
            }, o)), a.jsx("div", {
                style: {
                    height: "1px",
                    background: "#333",
                    margin: "16px 0"
                }
            }), a.jsxs("button", {
                onClick: d,
                style: {
                    width: "100%",
                    padding: "12px 16px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginBottom: "20px"
                },
                children: [a.jsx("i", {
                    className: "fa-solid fa-right-from-bracket"
                }), "Sair"]
            })]
        })]
    })
}
export {h as A};

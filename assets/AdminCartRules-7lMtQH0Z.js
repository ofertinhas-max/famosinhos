import {u as N, r as t, j as e} from "./index-Z_n8MByG.js";
import {A as I} from "./AdminSidebar-DpwmTKwH.js";
import {O as _} from "./OfertasNavTabs-CIVIrnLK.js";
function $() {
    const i = N()
      , [d,f] = t.useState([])
      , [v,n] = t.useState(!1)
      , [s,b] = t.useState(null)
      , [c,p] = t.useState("")
      , [x,m] = t.useState("")
      , [h,g] = t.useState("")
      , [y,u] = t.useState(0);
    t.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            i("/painelad", {
                state: {
                    from: "/painelad/regras-carrinho"
                }
            });
            return
        }
        l()
    }
    , [i]);
    const l = async () => {
        try {
            const r = localStorage.getItem("app_state")
              , o = await fetch("/api/db/cart-rules", {
                headers: {
                    Authorization: `Bearer ${r}`
                }
            });
            if (o.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                i("/painelad");
                return
            }
            if (!o.ok)
                throw new Error("Erro ao carregar regras");
            const a = await o.json();
            f(Array.isArray(a) ? a : [])
        } catch (r) {
            console.error("Erro ao carregar regras:", r),
            f([])
        }
    }
      , S = () => {
        b(null),
        p(""),
        m(""),
        g(""),
        u(0),
        n(!0)
    }
      , k = r => {
        b(r),
        p(r.nome),
        m(r.quantidade_minima.toString()),
        g(r.valor_fixo.toFixed(2)),
        u(r.prioridade),
        n(!0)
    }
      , z = async () => {
        if (!c || !x || !h) {
            alert("Preencha todos os campos obrigatórios");
            return
        }
        const r = parseInt(x)
          , o = parseFloat(h);
        if (r <= 0) {
            alert("Quantidade mínima deve ser maior que zero");
            return
        }
        if (o <= 0) {
            alert("Valor fixo deve ser maior que zero");
            return
        }
        try {
            const a = localStorage.getItem("app_state")
              , R = {
                nome: c,
                quantidade_minima: r,
                valor_fixo: o,
                ativo: s ? s.ativo : 1,
                prioridade: parseInt(y) || 0
            }
              , E = s ? `/api/db/cart-rules/${s.id}` : "/api/db/cart-rules"
              , j = await fetch(E, {
                method: s ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${a}`
                },
                body: JSON.stringify(R)
            });
            if (j.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                i("/painelad");
                return
            }
            if (!j.ok)
                throw new Error("Erro ao salvar regra");
            n(!1),
            await l()
        } catch (a) {
            console.error("Erro ao salvar regra:", a),
            alert("Erro ao salvar regra. Tente novamente.")
        }
    }
      , w = async r => {
        try {
            const o = localStorage.getItem("app_state")
              , a = await fetch(`/api/db/cart-rules/${r}/toggle`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${o}`
                }
            });
            if (a.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                i("/painelad");
                return
            }
            if (!a.ok)
                throw new Error("Erro ao alternar status");
            await l()
        } catch (o) {
            console.error("Erro ao alternar status:", o)
        }
    }
      , C = async r => {
        if (confirm("Deseja realmente excluir esta regra?"))
            try {
                const o = localStorage.getItem("app_state")
                  , a = await fetch(`/api/db/cart-rules/${r}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${o}`
                    }
                });
                if (a.status === 401) {
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("app_state"),
                    localStorage.removeItem("form_key"),
                    i("/painelad");
                    return
                }
                if (!a.ok)
                    throw new Error("Erro ao excluir regra");
                await l()
            } catch (o) {
                console.error("Erro ao excluir regra:", o),
                alert("Erro ao excluir regra. Tente novamente.")
            }
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(I, {}), e.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "32px",
                background: "#f5f5f5",
                minHeight: "100vh"
            },
            children: [e.jsx("h1", {
                style: {
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                    color: "#1a1a1a"
                },
                children: "Ofertas & Promoções"
            }), e.jsx(_, {}), e.jsxs("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                },
                children: [e.jsxs("div", {
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#1a1a1a",
                            marginBottom: "8px",
                            margin: 0
                        },
                        children: "Vendas em Atacado"
                    }), e.jsxs("p", {
                        style: {
                            fontSize: "14px",
                            color: "#666",
                            margin: 0,
                            marginTop: "4px"
                        },
                        children: [d.length, " ", d.length === 1 ? "regra configurada" : "regras configuradas"]
                    })]
                }), e.jsx("button", {
                    onClick: S,
                    className: "admin-btn",
                    style: {
                        padding: "12px 24px",
                        background: "#1a1a1a",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                    },
                    children: "+ Nova Regra"
                })]
            }), e.jsx("div", {
                className: "admin-card",
                style: {
                    marginBottom: "24px",
                    padding: "20px",
                    background: "#e3f2fd",
                    border: "1px solid #90caf9",
                    borderRadius: "12px"
                },
                children: e.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "start",
                        gap: "12px"
                    },
                    children: [e.jsx("div", {
                        style: {
                            fontSize: "20px"
                        },
                        children: "ℹ️"
                    }), e.jsxs("div", {
                        children: [e.jsx("h3", {
                            style: {
                                margin: 0,
                                marginBottom: "8px",
                                fontSize: "15px",
                                fontWeight: "600",
                                color: "#1565c0"
                            },
                            children: "Como funciona:"
                        }), e.jsx("p", {
                            style: {
                                margin: 0,
                                fontSize: "14px",
                                color: "#1976d2",
                                lineHeight: "1.6"
                            },
                            children: 'Configure regras como "3 por R$129". A regra será aplicada múltiplas vezes conforme a quantidade de produtos. Exemplo: 7 produtos = 2× R$129 (6 produtos) + 1 produto pelo preço normal. A regra com maior prioridade (menor número) é aplicada primeiro.'
                        })]
                    })]
                })
            }), e.jsx("div", {
                className: "admin-card",
                children: e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                children: "Nome"
                            }), e.jsx("th", {
                                children: "Quantidade"
                            }), e.jsx("th", {
                                children: "Valor Fixo"
                            }), e.jsx("th", {
                                children: "Status"
                            }), e.jsx("th", {
                                children: "Prioridade"
                            }), e.jsx("th", {
                                style: {
                                    textAlign: "center"
                                },
                                children: "Ações"
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: d.length === 0 ? e.jsx("tr", {
                            children: e.jsx("td", {
                                colSpan: "6",
                                style: {
                                    textAlign: "center",
                                    padding: "40px",
                                    color: "#999"
                                },
                                children: "Nenhuma regra cadastrada ainda."
                            })
                        }) : d.map(r => e.jsxs("tr", {
                            children: [e.jsx("td", {
                                children: e.jsx("div", {
                                    className: "admin-product-name",
                                    children: r.nome
                                })
                            }), e.jsx("td", {
                                children: e.jsxs("span", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#333"
                                    },
                                    children: [r.quantidade_minima, " produto", r.quantidade_minima !== 1 ? "s" : ""]
                                })
                            }), e.jsx("td", {
                                children: e.jsxs("span", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "700",
                                        color: "#28a745",
                                        background: "#d4edda",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        display: "inline-block"
                                    },
                                    children: ["R$ ", r.valor_fixo.toFixed(2)]
                                })
                            }), e.jsx("td", {
                                children: e.jsx("button", {
                                    onClick: () => w(r.id),
                                    className: `admin-stock-badge ${r.ativo ? "admin-stock-high" : "admin-stock-low"}`,
                                    style: {
                                        cursor: "pointer",
                                        border: "none"
                                    },
                                    children: r.ativo ? "ATIVA" : "INATIVA"
                                })
                            }), e.jsx("td", {
                                children: e.jsx("span", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#666",
                                        background: "#f5f5f5",
                                        padding: "4px 10px",
                                        borderRadius: "4px",
                                        display: "inline-block"
                                    },
                                    children: r.prioridade
                                })
                            }), e.jsx("td", {
                                children: e.jsxs("div", {
                                    className: "admin-actions",
                                    children: [e.jsx("button", {
                                        onClick: () => k(r),
                                        className: "admin-btn admin-btn-primary",
                                        children: "Editar"
                                    }), e.jsx("button", {
                                        onClick: () => C(r.id),
                                        className: "admin-btn admin-btn-danger",
                                        children: "Excluir"
                                    })]
                                })
                            })]
                        }, r.id))
                    })]
                })
            }), v && e.jsx("div", {
                className: "modal-overlay",
                onClick: () => n(!1),
                children: e.jsxs("div", {
                    className: "modal-content",
                    onClick: r => r.stopPropagation(),
                    style: {
                        maxWidth: "550px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        padding: "32px",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
                    },
                    children: [e.jsx("button", {
                        className: "modal-close-btn",
                        onClick: () => n(!1),
                        style: {
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            background: "#f5f5f5",
                            border: "none",
                            borderRadius: "8px",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            color: "#666"
                        },
                        children: e.jsxs("svg", {
                            viewBox: "0 0 24 24",
                            width: "20",
                            height: "20",
                            children: [e.jsx("line", {
                                x1: "18",
                                y1: "6",
                                x2: "6",
                                y2: "18",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round"
                            }), e.jsx("line", {
                                x1: "6",
                                y1: "6",
                                x2: "18",
                                y2: "18",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round"
                            })]
                        })
                    }), e.jsxs("div", {
                        style: {
                            marginBottom: "28px"
                        },
                        children: [e.jsx("h2", {
                            style: {
                                margin: 0,
                                marginBottom: "8px",
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#1a1a1a",
                                letterSpacing: "-0.5px"
                            },
                            children: s ? "Editar Regra" : "Nova Regra"
                        }), e.jsx("p", {
                            style: {
                                margin: 0,
                                fontSize: "15px",
                                color: "#666",
                                lineHeight: "1.5"
                            },
                            children: "Configure a quantidade mínima e o valor fixo para o carrinho"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "grid",
                            gap: "24px"
                        },
                        children: [e.jsxs("div", {
                            children: [e.jsx("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: "Nome da Regra *"
                            }), e.jsx("input", {
                                type: "text",
                                value: c,
                                onChange: r => p(r.target.value),
                                placeholder: "Ex: 3 por 129",
                                className: "checkout-form-input",
                                style: {
                                    fontSize: "14px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1.5px solid #e0e0e0",
                                    width: "100%",
                                    transition: "border-color 0.2s"
                                }
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px"
                            },
                            children: [e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "8px"
                                    },
                                    children: "Quantidade *"
                                }), e.jsx("input", {
                                    type: "number",
                                    value: x,
                                    onChange: r => m(r.target.value),
                                    placeholder: "3",
                                    min: "1",
                                    className: "checkout-form-input",
                                    style: {
                                        fontSize: "14px",
                                        padding: "12px 16px",
                                        borderRadius: "8px",
                                        border: "1.5px solid #e0e0e0",
                                        width: "100%",
                                        transition: "border-color 0.2s"
                                    }
                                }), e.jsx("small", {
                                    style: {
                                        display: "block",
                                        marginTop: "6px",
                                        color: "#666",
                                        fontSize: "12px"
                                    },
                                    children: "Produtos no carrinho"
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "8px"
                                    },
                                    children: "Valor Fixo (R$) *"
                                }), e.jsx("input", {
                                    type: "number",
                                    value: h,
                                    onChange: r => g(r.target.value),
                                    placeholder: "129.00",
                                    min: "0.01",
                                    step: "0.01",
                                    className: "checkout-form-input",
                                    style: {
                                        fontSize: "14px",
                                        padding: "12px 16px",
                                        borderRadius: "8px",
                                        border: "1.5px solid #e0e0e0",
                                        width: "100%",
                                        transition: "border-color 0.2s"
                                    }
                                }), e.jsx("small", {
                                    style: {
                                        display: "block",
                                        marginTop: "6px",
                                        color: "#666",
                                        fontSize: "12px"
                                    },
                                    children: "Preço total do carrinho"
                                })]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: "Prioridade"
                            }), e.jsx("input", {
                                type: "number",
                                value: y,
                                onChange: r => u(r.target.value),
                                placeholder: "0",
                                min: "0",
                                className: "checkout-form-input",
                                style: {
                                    fontSize: "14px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1.5px solid #e0e0e0",
                                    width: "100%",
                                    transition: "border-color 0.2s"
                                }
                            }), e.jsx("small", {
                                style: {
                                    display: "block",
                                    marginTop: "6px",
                                    color: "#666",
                                    fontSize: "12px",
                                    lineHeight: "1.4"
                                },
                                children: "Regras com menor número têm maior prioridade. Use 0 para maior prioridade."
                            })]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "32px",
                            paddingTop: "24px",
                            borderTop: "1.5px solid #e8e8e8"
                        },
                        children: [e.jsx("button", {
                            onClick: () => n(!1),
                            style: {
                                flex: 1,
                                padding: "13px 24px",
                                fontSize: "15px",
                                fontWeight: "600",
                                backgroundColor: "white",
                                color: "#555",
                                border: "1.5px solid #e0e0e0",
                                borderRadius: "10px",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            },
                            children: "Cancelar"
                        }), e.jsx("button", {
                            onClick: z,
                            style: {
                                flex: 1,
                                padding: "13px 24px",
                                fontSize: "15px",
                                fontWeight: "600",
                                backgroundColor: "#4caf50",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                transition: "all 0.2s",
                                boxShadow: "0 2px 8px rgba(76, 175, 80, 0.2)"
                            },
                            children: "Salvar Regra"
                        })]
                    })]
                })
            })]
        })]
    })
}
export {$ as default};

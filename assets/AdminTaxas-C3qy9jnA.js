import {u as S, r as i, j as e} from "./index-Z_n8MByG.js";
import {A as g} from "./AdminSidebar-DpwmTKwH.js";
import {O as T} from "./OfertasNavTabs-CIVIrnLK.js";
function C() {
    const l = S()
      , [d,r] = i.useState({
        taxa1: {
            url: "",
            ativo: !1,
            exigir: !1
        },
        taxa2: {
            url: "",
            ativo: !1,
            exigir: !1
        },
        taxa3: {
            url: "",
            ativo: !1,
            exigir: !1
        },
        taxa4: {
            url: "",
            ativo: !1,
            exigir: !1
        },
        taxa5: {
            url: "",
            ativo: !1,
            exigir: !1
        }
    })
      , [c,x] = i.useState(!0)
      , [u,p] = i.useState(!0)
      , [n,f] = i.useState(!1);
    i.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            l("/painelad", {
                state: {
                    from: "/painelad/taxas"
                }
            });
            return
        }
        h()
    }
    , [l]);
    const h = async () => {
        try {
            const s = await (await fetch("/api/taxas-links")).json();
            s.success && (r(s.taxas),
            s.incluirQueryParams !== void 0 && x(s.incluirQueryParams)),
            p(!1)
        } catch {
            p(!1)
        }
    }
      , m = async () => {
        f(!0);
        try {
            const a = "/api/taxas-links"
              , t = localStorage.getItem("form_key")
              , s = await fetch(a, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...t && {
                        "X-CSRF-Token": t
                    }
                },
                body: JSON.stringify({
                    taxas: d,
                    incluirQueryParams: c
                })
            })
              , o = await s.json();
            s.ok && o.success ? alert("Links das taxas salvos com sucesso!") : alert("Erro ao salvar: " + (o.error || "Erro desconhecido"))
        } catch {
            alert("Erro ao salvar taxas")
        } finally {
            f(!1)
        }
    }
      , y = (a, t) => {
        r(s => ({
            ...s,
            [a]: {
                ...s[a],
                url: t
            }
        }))
    }
      , b = a => {
        r(t => ({
            ...t,
            [a]: {
                ...t[a],
                ativo: !t[a].ativo
            }
        }))
    }
      , j = a => {
        r(t => ({
            ...t,
            [a]: {
                ...t[a],
                exigir: !t[a].exigir
            }
        }))
    }
      , v = () => {
        x(a => !a)
    }
    ;
    return u ? e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(g, {}), e.jsx("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "32px"
            },
            children: e.jsx("p", {
                children: "Carregando..."
            })
        })]
    }) : e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(g, {}), e.jsxs("div", {
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
            }), e.jsx(T, {}), e.jsxs("div", {
                style: {
                    marginBottom: "24px"
                },
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        marginBottom: "8px",
                        margin: 0
                    },
                    children: "Upsells"
                }), e.jsx("p", {
                    style: {
                        fontSize: "14px",
                        color: "#666",
                        margin: 0,
                        marginTop: "4px"
                    },
                    children: "Configure os links externos para cada taxa de upsell"
                })]
            }), e.jsx("div", {
                style: {
                    background: "#fff3cd",
                    padding: "16px",
                    borderRadius: "8px",
                    marginBottom: "24px",
                    border: "1px solid #ffc107"
                },
                children: e.jsxs("div", {
                    style: {
                        margin: 0,
                        color: "#856404",
                        fontSize: "14px"
                    },
                    children: [e.jsxs("p", {
                        style: {
                            margin: "0 0 12px 0"
                        },
                        children: [e.jsx("strong", {
                            children: "⚠️ IMPORTANTE:"
                        }), " Configure os links externos para cada taxa. Os links serão usados para redirecionar o cliente após o checkout."]
                    }), e.jsxs("p", {
                        style: {
                            margin: 0
                        },
                        children: [e.jsx("strong", {
                            children: "🔗 Parâmetros automáticos:"
                        }), " O sistema adiciona automaticamente ", e.jsxs("code", {
                            style: {
                                background: "rgba(0,0,0,0.1)",
                                padding: "2px 6px",
                                borderRadius: "3px",
                                fontSize: "13px"
                            },
                            children: ["?order=", "{numero_pedido}", "&ref=pedido:", "{numero_pedido}", "|taxa", "{numero_taxa}", "&nome=", "{nome}", "&documento=", "{cpf}", "&telefone=", "{telefone}", "&loja=", "{dominio}"]
                        }), " ao redirecionar."]
                    })]
                })
            }), e.jsxs("div", {
                style: {
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    marginBottom: "24px"
                },
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        marginBottom: "24px"
                    },
                    children: "Links de Redirecionamento"
                }), e.jsx("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    },
                    children: ["taxa1", "taxa2", "taxa3", "taxa4", "taxa5"].map( (a, t) => {
                        const s = d[a]
                          , o = s.ativo;
                        return e.jsxs("div", {
                            style: {
                                marginBottom: "4px",
                                padding: "16px",
                                border: `2px solid ${o ? "#28a745" : "#dc3545"}`,
                                borderRadius: "8px",
                                background: o ? "#f8fff9" : "#fff5f5",
                                opacity: o ? 1 : .7
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "12px"
                                },
                                children: [e.jsxs("label", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#333"
                                    },
                                    children: ["Taxa ", t + 1]
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    },
                                    children: [e.jsx("span", {
                                        style: {
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            color: o ? "#28a745" : "#dc3545"
                                        },
                                        children: o ? "Ativo" : "Inativo"
                                    }), e.jsx("button", {
                                        type: "button",
                                        onClick: () => b(a),
                                        style: {
                                            padding: "6px 12px",
                                            background: o ? "#dc3545" : "#28a745",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            fontWeight: "600"
                                        },
                                        children: o ? "Desativar" : "Ativar"
                                    })]
                                })]
                            }), e.jsx("input", {
                                type: "url",
                                value: s.url || "",
                                onChange: k => y(a, k.target.value),
                                placeholder: `https://exemplo.com/taxa${t + 1}`,
                                disabled: !o,
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontFamily: "inherit",
                                    opacity: o ? 1 : .6,
                                    cursor: o ? "text" : "not-allowed",
                                    marginBottom: "12px"
                                }
                            }), e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [e.jsxs("label", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        cursor: o ? "pointer" : "not-allowed",
                                        fontSize: "13px",
                                        fontWeight: "500",
                                        color: "#333",
                                        opacity: o ? 1 : .5
                                    },
                                    children: [e.jsx("input", {
                                        type: "checkbox",
                                        checked: s.exigir,
                                        onChange: () => j(a),
                                        disabled: !o,
                                        style: {
                                            width: "16px",
                                            height: "16px",
                                            cursor: o ? "pointer" : "not-allowed"
                                        }
                                    }), e.jsx("span", {
                                        children: "Exigir pagamento"
                                    })]
                                }), s.url && o && e.jsx("button", {
                                    type: "button",
                                    onClick: () => window.open(s.url, "_blank"),
                                    style: {
                                        padding: "4px 8px",
                                        background: "#6c757d",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "11px",
                                        marginLeft: "auto"
                                    },
                                    children: "🔗 Testar URL"
                                })]
                            })]
                        }, a)
                    }
                    )
                }), e.jsxs("div", {
                    style: {
                        marginTop: "24px",
                        padding: "16px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6"
                    },
                    children: [e.jsxs("label", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#333"
                        },
                        children: [e.jsx("input", {
                            type: "checkbox",
                            checked: c,
                            onChange: v,
                            style: {
                                width: "18px",
                                height: "18px",
                                cursor: "pointer"
                            }
                        }), e.jsx("span", {
                            children: "Incluir parâmetros da URL (UTM, ref, etc.) ao redirecionar para as taxas"
                        })]
                    }), e.jsx("p", {
                        style: {
                            margin: "8px 0 0 30px",
                            fontSize: "12px",
                            color: "#666"
                        },
                        children: "Quando ativado, todos os parâmetros da URL atual serão enviados para os links externos das taxas."
                    })]
                }), e.jsx("div", {
                    style: {
                        marginTop: "32px",
                        paddingTop: "24px",
                        borderTop: "1px solid #e9ecef",
                        display: "flex",
                        gap: "12px"
                    },
                    children: e.jsx("button", {
                        onClick: m,
                        disabled: n,
                        style: {
                            padding: "12px 24px",
                            background: n ? "#ccc" : "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: n ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: "600",
                            transition: "background 0.2s"
                        },
                        children: n ? "Salvando..." : "💾 Salvar Configurações"
                    })
                })]
            }), e.jsx("div", {
                style: {
                    background: "#e7f3ff",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #b3d9ff"
                },
                children: e.jsxs("p", {
                    style: {
                        margin: 0,
                        color: "#004085",
                        fontSize: "14px"
                    },
                    children: [e.jsx("strong", {
                        children: "ℹ️ Como funciona:"
                    }), " Quando o cliente finaliza o checkout, ele será redirecionado para a Taxa 1. Se você configurar mais taxas, pode criar um fluxo de funil com múltiplos upsells encadeados."]
                })
            })]
        })]
    })
}
export {C as default};

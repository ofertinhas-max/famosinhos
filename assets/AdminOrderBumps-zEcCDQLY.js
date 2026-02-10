import {u as P, r as s, d as n, j as e, f as T} from "./index-Z_n8MByG.js";
import {A as F} from "./AdminSidebar-DpwmTKwH.js";
import {O as H} from "./OfertasNavTabs-CIVIrnLK.js";
function $() {
    const k = P()
      , [C,_] = s.useState([])
      , [m,w] = s.useState([])
      , [c,N] = s.useState([])
      , [O,d] = s.useState(!1)
      , [p,z] = s.useState(null)
      , [l,h] = s.useState("")
      , [i,x] = s.useState([])
      , [g,f] = s.useState("")
      , [b,j] = s.useState("")
      , [y,v] = s.useState(0);
    s.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            k("/adminf3n1x", {
                state: {
                    from: "/adminf3n1x/order-bumps"
                }
            });
            return
        }
        u()
    }
    , [k]);
    const u = async () => {
        const o = await n.getAllOrderBumps()
          , t = await n.getAllProdutos()
          , a = await n.getAllCategorias();
        _(o),
        w(t),
        N(a)
    }
      , W = () => {
        z(null),
        h(""),
        x([]),
        f(""),
        j(""),
        v(0),
        d(!0)
    }
      , A = o => {
        z(o),
        h(o.produto_id.toString());
        let t = [];
        o.categorias_ids && Array.isArray(o.categorias_ids) ? t = o.categorias_ids.map(a => parseInt(a)) : o.categoria_id && (t = [parseInt(o.categoria_id)]),
        x(t),
        f(o.titulo_customizado),
        j(o.descricao_customizada),
        v(o.desconto_percentual || 0),
        d(!0)
    }
      , R = async () => {
        if (!l) {
            alert("Selecione um produto");
            return
        }
        const o = m.find(a => a.id === parseInt(l));
        let t = null;
        if (o && o.imagem) {
            const a = T(o.imagem);
            t = a.length > 0 ? a[0] : null
        }
        p ? await n.updateOrderBump(p.id, {
            produto_id: parseInt(l),
            titulo_customizado: g || o.nome,
            descricao_customizada: b || "Adicione este produto à sua compra com desconto especial!",
            ativo: p.ativo,
            desconto_percentual: parseFloat(y) || 0,
            imagem: t,
            categorias_ids: i
        }) : await n.insertOrderBump({
            produto_id: parseInt(l),
            titulo_customizado: g || o.nome,
            descricao_customizada: b || "Adicione este produto à sua compra com desconto especial!",
            ativo: !0,
            desconto_percentual: parseFloat(y) || 0,
            imagem: t,
            categorias_ids: i
        }),
        d(!1),
        await u()
    }
      , I = async o => {
        await n.toggleOrderBumpAtivo(o),
        await u()
    }
      , D = async o => {
        confirm("Deseja realmente excluir este order-bump?") && (await n.deleteOrderBump(o),
        await u())
    }
      , E = o => m.find(t => t.id === o);
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(F, {}), e.jsxs("div", {
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
            }), e.jsx(H, {}), e.jsxs("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px"
                },
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        margin: 0
                    },
                    children: "Order Bumps"
                }), e.jsx("button", {
                    onClick: W,
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
                    children: "+ Novo Order Bump"
                })]
            }), e.jsx("div", {
                className: "admin-card",
                children: e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                children: "ID"
                            }), e.jsx("th", {
                                children: "Produto"
                            }), e.jsx("th", {
                                children: "Título Customizado"
                            }), e.jsx("th", {
                                children: "Categoria Relacionada"
                            }), e.jsx("th", {
                                children: "Desconto"
                            }), e.jsx("th", {
                                children: "Status"
                            }), e.jsx("th", {
                                style: {
                                    textAlign: "center"
                                },
                                children: "Ações"
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: C.map(o => {
                            const t = E(o.produto_id);
                            let a = [];
                            if (o.categorias_ids && Array.isArray(o.categorias_ids) && o.categorias_ids.length > 0)
                                a = o.categorias_ids.map(r => c.find(S => S.id === r)).filter(r => r !== void 0);
                            else if (o.categoria_id) {
                                const r = c.find(S => S.id === o.categoria_id);
                                r && (a = [r])
                            }
                            return e.jsxs("tr", {
                                children: [e.jsx("td", {
                                    children: o.id
                                }), e.jsxs("td", {
                                    children: [e.jsx("div", {
                                        className: "admin-product-name",
                                        children: t == null ? void 0 : t.nome
                                    }), e.jsxs("div", {
                                        className: "admin-product-meta",
                                        children: ["R$ ", t == null ? void 0 : t.preco.toFixed(2)]
                                    })]
                                }), e.jsxs("td", {
                                    children: [e.jsx("div", {
                                        className: "admin-product-name",
                                        children: o.titulo_customizado
                                    }), e.jsx("div", {
                                        className: "admin-product-meta",
                                        style: {
                                            fontSize: "12px",
                                            color: "#666"
                                        },
                                        children: o.descricao_customizada
                                    })]
                                }), e.jsx("td", {
                                    children: a.length > 0 ? e.jsx("div", {
                                        style: {
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "4px"
                                        },
                                        children: a.map(r => e.jsx("span", {
                                            style: {
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                color: "#333",
                                                backgroundColor: "#f0f0f0",
                                                padding: "4px 8px",
                                                borderRadius: "4px"
                                            },
                                            children: r.nome
                                        }, r.id))
                                    }) : e.jsx("span", {
                                        style: {
                                            color: "#999",
                                            fontSize: "13px"
                                        },
                                        children: "Todas"
                                    })
                                }), e.jsx("td", {
                                    children: o.desconto_percentual && o.desconto_percentual > 0 ? e.jsxs("span", {
                                        style: {
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#4CAF50",
                                            backgroundColor: "#E8F5E9",
                                            padding: "4px 8px",
                                            borderRadius: "4px"
                                        },
                                        children: ["-", o.desconto_percentual, "%"]
                                    }) : e.jsx("span", {
                                        style: {
                                            color: "#999",
                                            fontSize: "14px"
                                        },
                                        children: "Sem desconto"
                                    })
                                }), e.jsx("td", {
                                    children: e.jsx("button", {
                                        onClick: () => I(o.id),
                                        className: `admin-stock-badge ${o.ativo ? "admin-stock-high" : "admin-stock-low"}`,
                                        style: {
                                            cursor: "pointer",
                                            border: "none"
                                        },
                                        children: o.ativo ? "Ativo" : "Inativo"
                                    })
                                }), e.jsx("td", {
                                    children: e.jsxs("div", {
                                        className: "admin-actions",
                                        children: [e.jsx("button", {
                                            onClick: () => A(o),
                                            className: "admin-btn admin-btn-primary",
                                            children: "Editar"
                                        }), e.jsx("button", {
                                            onClick: () => D(o.id),
                                            className: "admin-btn admin-btn-danger",
                                            children: "Excluir"
                                        })]
                                    })
                                })]
                            }, o.id)
                        }
                        )
                    })]
                })
            }), e.jsxs("div", {
                className: "admin-note",
                children: [e.jsx("strong", {
                    children: "Nota:"
                }), " Order-bumps são produtos especiais que aparecem na etapa de pagamento do checkout para incentivar compras adicionais. Configure aqui quais produtos devem aparecer como order-bumps."]
            }), O && e.jsx("div", {
                className: "modal-overlay",
                onClick: () => d(!1),
                children: e.jsxs("div", {
                    className: "modal-content",
                    onClick: o => o.stopPropagation(),
                    style: {
                        maxWidth: "650px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        padding: "32px",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
                    },
                    children: [e.jsx("button", {
                        className: "modal-close-btn",
                        onClick: () => d(!1),
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
                            children: p ? "Editar Order Bump" : "Novo Order Bump"
                        }), e.jsx("p", {
                            style: {
                                margin: 0,
                                fontSize: "15px",
                                color: "#666",
                                lineHeight: "1.5"
                            },
                            children: "Configure um produto especial para ser oferecido no checkout"
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
                                children: "Produto *"
                            }), e.jsxs("select", {
                                value: l,
                                onChange: o => h(o.target.value),
                                className: "checkout-form-input",
                                style: {
                                    fontSize: "14px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1.5px solid #e0e0e0",
                                    width: "100%",
                                    transition: "border-color 0.2s"
                                },
                                children: [e.jsx("option", {
                                    value: "",
                                    children: "Selecione um produto"
                                }), m.map(o => e.jsxs("option", {
                                    value: o.id,
                                    children: [o.nome, " - R$ ", o.preco.toFixed(2)]
                                }, o.id))]
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
                                children: "Desconto (%)"
                            }), e.jsx("input", {
                                type: "number",
                                value: y,
                                onChange: o => v(o.target.value),
                                placeholder: "0",
                                min: "0",
                                max: "100",
                                step: "0.1",
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
                                children: "Exemplo: 10 para 10% de desconto"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsxs("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: ["Título Customizado ", e.jsx("span", {
                                    style: {
                                        color: "#999",
                                        fontWeight: "400"
                                    },
                                    children: "(opcional)"
                                })]
                            }), e.jsx("input", {
                                type: "text",
                                value: g,
                                onChange: o => f(o.target.value),
                                placeholder: "Deixe vazio para usar o nome do produto",
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
                                children: "Personalize o título exibido no checkout"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsxs("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: ["Descrição Customizada ", e.jsx("span", {
                                    style: {
                                        color: "#999",
                                        fontWeight: "400"
                                    },
                                    children: "(opcional)"
                                })]
                            }), e.jsx("textarea", {
                                value: b,
                                onChange: o => j(o.target.value),
                                placeholder: "Adicione este produto à sua compra com desconto especial!",
                                className: "checkout-form-input",
                                rows: "3",
                                style: {
                                    fontSize: "14px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1.5px solid #e0e0e0",
                                    width: "100%",
                                    resize: "vertical",
                                    transition: "border-color 0.2s",
                                    lineHeight: "1.5"
                                }
                            }), e.jsx("small", {
                                style: {
                                    display: "block",
                                    marginTop: "6px",
                                    color: "#666",
                                    fontSize: "12px"
                                },
                                children: "Mensagem persuasiva para incentivar a compra"
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsxs("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: ["Categorias Relacionadas ", e.jsx("span", {
                                    style: {
                                        color: "#999",
                                        fontWeight: "400"
                                    },
                                    children: "(opcional)"
                                })]
                            }), e.jsx("div", {
                                style: {
                                    border: "1.5px solid #e0e0e0",
                                    borderRadius: "10px",
                                    padding: "14px",
                                    backgroundColor: "#fafafa",
                                    maxHeight: "220px",
                                    overflowY: "auto"
                                },
                                children: c.length === 0 ? e.jsx("p", {
                                    style: {
                                        color: "#999",
                                        fontSize: "13px",
                                        margin: 0
                                    },
                                    children: "Nenhuma categoria disponível"
                                }) : e.jsx("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px"
                                    },
                                    children: c.map(o => e.jsxs("label", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            cursor: "pointer",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            backgroundColor: i.includes(o.id) ? "#e8f5e9" : "white",
                                            border: "1px solid",
                                            borderColor: i.includes(o.id) ? "#4caf50" : "#e0e0e0",
                                            transition: "all 0.2s"
                                        },
                                        children: [e.jsx("input", {
                                            type: "checkbox",
                                            checked: i.includes(o.id),
                                            onChange: t => {
                                                t.target.checked ? x([...i, o.id]) : x(i.filter(a => a !== o.id))
                                            }
                                            ,
                                            style: {
                                                width: "19px",
                                                height: "19px",
                                                cursor: "pointer",
                                                accentColor: "#4caf50",
                                                flexShrink: 0
                                            }
                                        }), e.jsx("span", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: i.includes(o.id) ? "600" : "400",
                                                color: i.includes(o.id) ? "#1a1a1a" : "#555",
                                                flex: 1
                                            },
                                            children: o.nome
                                        })]
                                    }, o.id))
                                })
                            }), e.jsx("small", {
                                style: {
                                    display: "block",
                                    marginTop: "10px",
                                    color: "#666",
                                    fontSize: "12px",
                                    lineHeight: "1.5"
                                },
                                children: i.length === 0 ? "💡 Nenhuma categoria selecionada - o order bump aparecerá para todos os carrinhos" : `✓ Order bump aparecerá quando o carrinho contiver produtos de ${i.length === 1 ? "esta categoria" : "alguma destas categorias"}`
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
                            onClick: () => d(!1),
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
                            onClick: R,
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
                            children: "Salvar Order Bump"
                        })]
                    })]
                })
            })]
        })]
    })
}
export {$ as default};

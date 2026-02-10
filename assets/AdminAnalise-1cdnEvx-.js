import {u as w, r as g, l as b, j as e} from "./index-Z_n8MByG.js";
import {A as k} from "./AdminSidebar-DpwmTKwH.js";
function E() {
    const S = w()
      , [f,A] = g.useState("funil")
      , [p,F] = g.useState([])
      , [o,W] = g.useState({
        carrinhos: 0,
        checkout: 0,
        pixGerado: 0,
        pagos: 0
    })
      , [l,m] = g.useState([])
      , [z,R] = g.useState(5)
      , [h,v] = g.useState({
        generos: [],
        faixasEtarias: []
    })
      , [j,C] = g.useState(!0)
      , r = t => (t || 0).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    g.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            S("/adminf3n1x");
            return
        }
        _()
    }
    , [S]);
    const _ = async () => {
        try {
            const t = "/api/db"
              , s = await (await fetch(`${t}/produtos/top-vendidos`)).json();
            F(s);
            const d = await (await fetch(`${t}/funil-conversao`)).json();
            W(d);
            const a = await fetch(`${t}/estados-vendas`);
            if (a.ok) {
                const c = await a.json();
                m(Array.isArray(c) ? c : [])
            } else
                b.error("Erro ao carregar estados:", a.status),
                m([]);
            const x = await fetch(`${t}/persona-clientes`, {
                credentials: "include"
            });
            if (x.ok) {
                const c = await x.json();
                c.success ? v({
                    generos: c.generos || [],
                    faixasEtarias: c.faixasEtarias || []
                }) : (b.error("Erro ao carregar persona:", c.error),
                v({
                    generos: [],
                    faixasEtarias: []
                }))
            } else
                b.error("Erro ao carregar persona:", x.status),
                v({
                    generos: [],
                    faixasEtarias: []
                })
        } catch {
            m([])
        } finally {
            C(!1)
        }
    }
      , P = [{
        id: "funil",
        nome: "Funil de Conversão",
        icone: "fa-filter"
    }, {
        id: "produtos",
        nome: "Ranking Produtos",
        icone: "fa-trophy"
    }, {
        id: "estados",
        nome: "Ranking Estados",
        icone: "fa-map-marked-alt"
    }, {
        id: "persona",
        nome: "Persona",
        icone: "fa-users"
    }];
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(k, {}), e.jsxs("div", {
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
                    color: "#1a1a1a",
                    marginBottom: "32px"
                },
                children: "Análise de Vendas"
            }), e.jsx("div", {
                style: {
                    display: "flex",
                    gap: "8px",
                    marginBottom: "24px",
                    background: "white",
                    padding: "12px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                },
                children: P.map(t => e.jsxs("button", {
                    onClick: () => A(t.id),
                    style: {
                        flex: 1,
                        padding: "12px 16px",
                        background: f === t.id ? "#1a1a1a" : "transparent",
                        color: f === t.id ? "white" : "#666",
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
                    children: [e.jsx("i", {
                        className: `fa-solid ${t.icone}`
                    }), t.nome]
                }, t.id))
            }), f === "funil" && e.jsxs("div", {
                className: "admin-card",
                style: {
                    marginBottom: "32px"
                },
                children: [e.jsxs("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: [e.jsx("i", {
                        className: "fa-solid fa-filter",
                        style: {
                            marginRight: "8px",
                            color: "#FF2B56"
                        }
                    }), "Funil de Conversão"]
                }), j ? e.jsx("p", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "40px 0"
                    },
                    children: "Carregando..."
                }) : e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-end"
                    },
                    children: [e.jsxs("div", {
                        style: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                borderRadius: "12px",
                                padding: "24px",
                                color: "white",
                                position: "relative",
                                height: o.carrinhos > 0 ? "200px" : "100px",
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                transition: "all 0.3s"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    fontSize: "14px",
                                    opacity: .9,
                                    marginBottom: "8px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-shopping-cart",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "Carrinho"]
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "32px",
                                    fontWeight: "bold"
                                },
                                children: o.carrinhos
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    opacity: .8,
                                    marginTop: "4px"
                                },
                                children: "100%"
                            })]
                        }), e.jsx("div", {
                            style: {
                                height: "3px",
                                background: "linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                                margin: "8px auto",
                                width: "80%"
                            }
                        })]
                    }), e.jsxs("div", {
                        style: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                                borderRadius: "12px",
                                padding: "24px",
                                color: "white",
                                position: "relative",
                                height: o.carrinhos > 0 ? `${Math.max(o.checkout / o.carrinhos * 200, 100)}px` : "100px",
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                transition: "all 0.3s"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    fontSize: "14px",
                                    opacity: .9,
                                    marginBottom: "8px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-user-edit",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "Dados Preenchidos"]
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "32px",
                                    fontWeight: "bold"
                                },
                                children: o.checkout
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    opacity: .8,
                                    marginTop: "4px"
                                },
                                children: o.carrinhos > 0 ? `${(o.checkout / o.carrinhos * 100).toFixed(1)}%` : "0%"
                            })]
                        }), e.jsx("div", {
                            style: {
                                height: "3px",
                                background: "linear-gradient(90deg, #f5576c 0%, #ff6b6b 50%, #feca57 100%)",
                                margin: "8px auto",
                                width: "80%"
                            }
                        })]
                    }), e.jsxs("div", {
                        style: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                                borderRadius: "12px",
                                padding: "24px",
                                color: "white",
                                position: "relative",
                                height: o.carrinhos > 0 ? `${Math.max(o.pixGerado / o.carrinhos * 200, 100)}px` : "100px",
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                transition: "all 0.3s"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    fontSize: "14px",
                                    opacity: .9,
                                    marginBottom: "8px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-qrcode",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "PIX Gerado"]
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "32px",
                                    fontWeight: "bold"
                                },
                                children: o.pixGerado
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    opacity: .8,
                                    marginTop: "4px"
                                },
                                children: o.carrinhos > 0 ? `${(o.pixGerado / o.carrinhos * 100).toFixed(1)}%` : "0%"
                            })]
                        }), e.jsx("div", {
                            style: {
                                height: "3px",
                                background: "linear-gradient(90deg, #feca57 0%, #48c774 50%, #00d1b2 100%)",
                                margin: "8px auto",
                                width: "80%"
                            }
                        })]
                    }), e.jsx("div", {
                        style: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: e.jsxs("div", {
                            style: {
                                background: "linear-gradient(135deg, #48c774 0%, #00d1b2 100%)",
                                borderRadius: "12px",
                                padding: "24px",
                                color: "white",
                                position: "relative",
                                height: o.carrinhos > 0 ? `${Math.max(o.pagos / o.carrinhos * 200, 100)}px` : "100px",
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                transition: "all 0.3s"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    fontSize: "14px",
                                    opacity: .9,
                                    marginBottom: "8px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-check-circle",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "Pagos"]
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "32px",
                                    fontWeight: "bold"
                                },
                                children: o.pagos
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    opacity: .8,
                                    marginTop: "4px"
                                },
                                children: o.carrinhos > 0 ? `${(o.pagos / o.carrinhos * 100).toFixed(1)}%` : "0%"
                            })]
                        })
                    })]
                }), !j && o.carrinhos > 0 && e.jsxs("div", {
                    style: {
                        marginTop: "24px",
                        padding: "16px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                        gap: "16px"
                    },
                    children: [e.jsxs("div", {
                        style: {
                            textAlign: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Taxa de Checkout"
                        }), e.jsxs("div", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#f5576c"
                            },
                            children: [(o.checkout / o.carrinhos * 100).toFixed(1), "%"]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            textAlign: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Taxa de Geração PIX"
                        }), e.jsxs("div", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#ff6b6b"
                            },
                            children: [(o.pixGerado / o.carrinhos * 100).toFixed(1), "%"]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            textAlign: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Taxa de Pagamento"
                        }), e.jsxs("div", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#48c774"
                            },
                            children: [(o.pagos / o.carrinhos * 100).toFixed(1), "%"]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            textAlign: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "12px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Conversão Total"
                        }), e.jsxs("div", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "bold",
                                color: "#00d1b2"
                            },
                            children: [(o.pagos / o.carrinhos * 100).toFixed(1), "%"]
                        })]
                    })]
                })]
            }), f === "produtos" && e.jsxs("div", {
                className: "admin-card",
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Top 10 Produtos Mais Vendidos"
                }), j ? e.jsx("p", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "40px 0"
                    },
                    children: "Carregando..."
                }) : p.length === 0 ? e.jsx("p", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "40px 0"
                    },
                    children: "Nenhum produto vendido ainda"
                }) : e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                style: {
                                    width: "60px",
                                    textAlign: "center"
                                },
                                children: "Posição"
                            }), e.jsx("th", {
                                style: {
                                    width: "80px"
                                },
                                children: "Imagem"
                            }), e.jsx("th", {
                                children: "Produto"
                            }), e.jsx("th", {
                                children: "Categoria"
                            }), e.jsx("th", {
                                style: {
                                    width: "100px",
                                    textAlign: "center"
                                },
                                children: "Vendas"
                            }), e.jsx("th", {
                                style: {
                                    width: "140px",
                                    textAlign: "right"
                                },
                                children: "Receita Gerada"
                            }), e.jsx("th", {
                                style: {
                                    width: "140px",
                                    textAlign: "right"
                                },
                                children: "Receita Paga"
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: p.map( (t, i) => {
                            let s = t.imagem;
                            if (typeof s == "string")
                                try {
                                    s = JSON.parse(s)
                                } catch {
                                    s = [s]
                                }
                            Array.isArray(s) || (s = [s]);
                            const d = s.filter(u => u ? !(/\.(mp4|webm|ogg|mov)$/i.test(u) || u.includes("video")) : !1)[0] || "/placeholder.png"
                              , a = t.total_vendido || t.vendidos * t.preco
                              , x = t.total_pago || 0;
                            let c = "#666"
                              , y = "#f5f5f5";
                            return i === 0 ? (c = "#FFD700",
                            y = "#FFF9E6") : i === 1 ? (c = "#C0C0C0",
                            y = "#F5F5F5") : i === 2 && (c = "#CD7F32",
                            y = "#FFF4E6"),
                            e.jsxs("tr", {
                                children: [e.jsx("td", {
                                    style: {
                                        textAlign: "center"
                                    },
                                    children: e.jsx("div", {
                                        style: {
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: y,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold",
                                            fontSize: "18px",
                                            color: c,
                                            margin: "0 auto"
                                        },
                                        children: i + 1
                                    })
                                }), e.jsx("td", {
                                    children: e.jsx("img", {
                                        src: d,
                                        alt: t.nome,
                                        style: {
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "1px solid #e0e0e0"
                                        }
                                    })
                                }), e.jsxs("td", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontWeight: "500",
                                            color: "#1a1a1a"
                                        },
                                        children: t.nome
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#999",
                                            marginTop: "4px"
                                        },
                                        children: ["Criado em: ", t.criado_em ? new Date(t.criado_em).toLocaleDateString("pt-BR") : "N/A"]
                                    })]
                                }), e.jsx("td", {
                                    children: e.jsx("span", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            display: "inline-block",
                                            padding: "4px 8px",
                                            background: "#f5f5f5",
                                            borderRadius: "4px"
                                        },
                                        children: t.categoria || "Sem categoria"
                                    })
                                }), e.jsxs("td", {
                                    style: {
                                        textAlign: "center"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                            color: "#4CAF50"
                                        },
                                        children: t.vendidos
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#999",
                                            marginTop: "2px"
                                        },
                                        children: "pagas"
                                    }), t.vendidos_total && t.vendidos_total !== t.vendidos && e.jsxs("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#666",
                                            marginTop: "4px",
                                            fontWeight: "500"
                                        },
                                        children: [t.vendidos_total, " geradas"]
                                    })]
                                }), e.jsxs("td", {
                                    style: {
                                        textAlign: "right"
                                    },
                                    children: [e.jsxs("div", {
                                        style: {
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#666"
                                        },
                                        children: ["R$ ", r(a)]
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#999",
                                            marginTop: "2px"
                                        },
                                        children: "Total gerado"
                                    })]
                                }), e.jsxs("td", {
                                    style: {
                                        textAlign: "right"
                                    },
                                    children: [e.jsxs("div", {
                                        style: {
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#28a745"
                                        },
                                        children: ["R$ ", r(x)]
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "11px",
                                            color: x >= a ? "#28a745" : "#ffc107",
                                            marginTop: "2px"
                                        },
                                        children: x > 0 ? `${(x / a * 100).toFixed(0)}% pago` : "Pendente"
                                    })]
                                })]
                            }, t.id)
                        }
                        )
                    })]
                }), p.length > 0 && e.jsx("div", {
                    style: {
                        marginTop: "24px",
                        padding: "20px",
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e0e0e0"
                    },
                    children: e.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "20px"
                        },
                        children: [e.jsxs("div", {
                            children: [e.jsx("div", {
                                style: {
                                    fontSize: "13px",
                                    color: "#666",
                                    marginBottom: "4px"
                                },
                                children: "Total de Vendas"
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#1a1a1a"
                                },
                                children: p.reduce( (t, i) => t + i.vendidos, 0)
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("div", {
                                style: {
                                    fontSize: "13px",
                                    color: "#666",
                                    marginBottom: "4px"
                                },
                                children: "Receita Gerada"
                            }), e.jsxs("div", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#666"
                                },
                                children: ["R$ ", r(p.reduce( (t, i) => t + (i.total_vendido || i.vendidos * i.preco), 0))]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("div", {
                                style: {
                                    fontSize: "13px",
                                    color: "#666",
                                    marginBottom: "4px"
                                },
                                children: "Receita Paga"
                            }), e.jsxs("div", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#28a745"
                                },
                                children: ["R$ ", r(p.reduce( (t, i) => t + (i.total_pago || 0), 0))]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("div", {
                                style: {
                                    fontSize: "13px",
                                    color: "#666",
                                    marginBottom: "4px"
                                },
                                children: "Taxa de Pagamento"
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#ffc107"
                                },
                                children: ( () => {
                                    const t = p.reduce( (s, n) => s + (n.total_vendido || n.vendidos * n.preco), 0)
                                      , i = p.reduce( (s, n) => s + (n.total_pago || 0), 0);
                                    return t > 0 ? `${(i / t * 100).toFixed(0)}%` : "0%"
                                }
                                )()
                            })]
                        })]
                    })
                })]
            }), f === "estados" && e.jsxs("div", {
                className: "admin-card",
                style: {
                    marginTop: "32px"
                },
                children: [e.jsxs("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: [e.jsx("i", {
                        className: "fa-solid fa-map-marked-alt",
                        style: {
                            marginRight: "8px",
                            color: "#FF2B56"
                        }
                    }), "Estados que Mais Vendem"]
                }), j ? e.jsx("p", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "40px 0"
                    },
                    children: "Carregando..."
                }) : l.length === 0 ? e.jsx("p", {
                    style: {
                        color: "#999",
                        textAlign: "center",
                        padding: "40px 0"
                    },
                    children: "Nenhuma venda registrada ainda"
                }) : e.jsxs("div", {
                    children: [e.jsxs("table", {
                        className: "admin-table",
                        children: [e.jsx("thead", {
                            children: e.jsxs("tr", {
                                children: [e.jsx("th", {
                                    style: {
                                        width: "60px",
                                        textAlign: "center"
                                    },
                                    children: "Posição"
                                }), e.jsx("th", {
                                    children: "Estado"
                                }), e.jsx("th", {
                                    style: {
                                        width: "120px",
                                        textAlign: "center"
                                    },
                                    children: "Pedidos Gerados"
                                }), e.jsx("th", {
                                    style: {
                                        width: "120px",
                                        textAlign: "center"
                                    },
                                    children: "Pedidos Pagos"
                                }), e.jsx("th", {
                                    style: {
                                        width: "100px",
                                        textAlign: "center"
                                    },
                                    children: "Conversão"
                                }), e.jsx("th", {
                                    style: {
                                        width: "150px",
                                        textAlign: "right"
                                    },
                                    children: "Receita Total"
                                }), e.jsx("th", {
                                    style: {
                                        width: "130px",
                                        textAlign: "right"
                                    },
                                    children: "Ticket Médio"
                                })]
                            })
                        }), e.jsx("tbody", {
                            children: l.slice(0, z).map( (t, i) => {
                                const s = t.pedidos_pagos > 0 ? t.receita_total / t.pedidos_pagos : 0;
                                let n = "#666"
                                  , d = "#f5f5f5";
                                return i === 0 ? (n = "#FFD700",
                                d = "#FFF9E6") : i === 1 ? (n = "#C0C0C0",
                                d = "#F5F5F5") : i === 2 && (n = "#CD7F32",
                                d = "#FFF4E6"),
                                e.jsxs("tr", {
                                    children: [e.jsx("td", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: e.jsx("div", {
                                            style: {
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                background: d,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                fontSize: "18px",
                                                color: n,
                                                margin: "0 auto"
                                            },
                                            children: i + 1
                                        })
                                    }), e.jsx("td", {
                                        children: e.jsx("div", {
                                            style: {
                                                fontWeight: "600",
                                                fontSize: "16px",
                                                color: "#1a1a1a"
                                            },
                                            children: t.estado
                                        })
                                    }), e.jsx("td", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: e.jsx("div", {
                                            style: {
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "#666"
                                            },
                                            children: t.pedidos_gerados
                                        })
                                    }), e.jsx("td", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: e.jsx("div", {
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                color: "#4CAF50"
                                            },
                                            children: t.pedidos_pagos
                                        })
                                    }), e.jsx("td", {
                                        style: {
                                            textAlign: "center"
                                        },
                                        children: e.jsxs("div", {
                                            style: {
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                color: t.taxa_conversao >= 50 ? "#28a745" : t.taxa_conversao >= 30 ? "#ffc107" : "#ff6b6b"
                                            },
                                            children: [t.taxa_conversao, "%"]
                                        })
                                    }), e.jsx("td", {
                                        style: {
                                            textAlign: "right"
                                        },
                                        children: e.jsxs("div", {
                                            style: {
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "#28a745"
                                            },
                                            children: ["R$ ", r(t.receita_total)]
                                        })
                                    }), e.jsx("td", {
                                        style: {
                                            textAlign: "right"
                                        },
                                        children: e.jsxs("div", {
                                            style: {
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                color: "#666"
                                            },
                                            children: ["R$ ", r(s)]
                                        })
                                    })]
                                }, t.estado)
                            }
                            )
                        })]
                    }), z < l.length && e.jsx("div", {
                        style: {
                            textAlign: "center",
                            marginTop: "20px"
                        },
                        children: e.jsx("button", {
                            onClick: () => R(t => Math.min(t + 10, l.length)),
                            style: {
                                padding: "12px 32px",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            },
                            onMouseEnter: t => {
                                t.target.style.transform = "translateY(-2px)",
                                t.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)"
                            }
                            ,
                            onMouseLeave: t => {
                                t.target.style.transform = "translateY(0)",
                                t.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
                            }
                            ,
                            children: "Ver mais (+10)"
                        })
                    }), l.length > 0 && e.jsx("div", {
                        style: {
                            marginTop: "24px",
                            padding: "20px",
                            background: "#f8f9fa",
                            borderRadius: "8px",
                            border: "1px solid #e0e0e0"
                        },
                        children: e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                gap: "20px"
                            },
                            children: [e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Total de Estados"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#1a1a1a"
                                    },
                                    children: l.length
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Pedidos Gerados"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#666"
                                    },
                                    children: l.reduce( (t, i) => t + i.pedidos_gerados, 0)
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Pedidos Pagos"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#4CAF50"
                                    },
                                    children: l.reduce( (t, i) => t + i.pedidos_pagos, 0)
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Conversão Média"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#ffc107"
                                    },
                                    children: ( () => {
                                        const t = l.reduce( (s, n) => s + n.pedidos_gerados, 0)
                                          , i = l.reduce( (s, n) => s + n.pedidos_pagos, 0);
                                        return t > 0 ? `${(i / t * 100).toFixed(1)}%` : "0%"
                                    }
                                    )()
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Receita Total"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#28a745"
                                    },
                                    children: ["R$ ", r(l.reduce( (t, i) => t + i.receita_total, 0))]
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666",
                                        marginBottom: "4px"
                                    },
                                    children: "Ticket Médio"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        color: "#17a2b8"
                                    },
                                    children: ( () => {
                                        const t = l.reduce( (s, n) => s + n.pedidos_pagos, 0)
                                          , i = l.reduce( (s, n) => s + n.receita_total, 0);
                                        return t > 0 ? `R$ ${r(i / t)}` : "R$ 0,00"
                                    }
                                    )()
                                })]
                            })]
                        })
                    })]
                })]
            }), f === "persona" && e.jsxs("div", {
                children: [e.jsxs("div", {
                    className: "admin-card",
                    style: {
                        marginBottom: "32px"
                    },
                    children: [e.jsxs("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            color: "#1a1a1a"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-venus-mars",
                            style: {
                                marginRight: "8px",
                                color: "#FF2B56"
                            }
                        }), "Análise por Gênero"]
                    }), j ? e.jsx("p", {
                        style: {
                            color: "#999",
                            textAlign: "center",
                            padding: "40px 0"
                        },
                        children: "Carregando..."
                    }) : e.jsxs("div", {
                        children: [e.jsxs("table", {
                            className: "admin-table",
                            children: [e.jsx("thead", {
                                children: e.jsxs("tr", {
                                    children: [e.jsx("th", {
                                        children: "Gênero"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "center"
                                        },
                                        children: "Pedidos Gerados"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "center"
                                        },
                                        children: "Pedidos Pagos"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "120px",
                                            textAlign: "center"
                                        },
                                        children: "Conversão"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "180px",
                                            textAlign: "right"
                                        },
                                        children: "Receita Total"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "right"
                                        },
                                        children: "Ticket Médio"
                                    })]
                                })
                            }), e.jsx("tbody", {
                                children: h.generos.map(t => {
                                    const i = t.total_pedidos > 0 ? (t.pedidos_pagos / t.total_pedidos * 100).toFixed(1) : 0
                                      , s = t.pedidos_pagos > 0 ? t.receita_total / t.pedidos_pagos : 0;
                                    let n = "fa-user"
                                      , d = "#999";
                                    return t.genero === "Masculino" ? (n = "fa-mars",
                                    d = "#4A90E2") : t.genero === "Feminino" ? (n = "fa-venus",
                                    d = "#E91E63") : t.genero === "Não Consta" && (n = "fa-question-circle",
                                    d = "#FF9800"),
                                    e.jsxs("tr", {
                                        children: [e.jsx("td", {
                                            children: e.jsxs("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        width: "45px",
                                                        height: "45px",
                                                        borderRadius: "50%",
                                                        background: `${d}20`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: d
                                                    },
                                                    children: e.jsx("i", {
                                                        className: `fa-solid ${n}`,
                                                        style: {
                                                            fontSize: "20px"
                                                        }
                                                    })
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: t.genero
                                                })]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsx("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#666"
                                                },
                                                children: t.total_pedidos
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsx("div", {
                                                style: {
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                    color: "#4CAF50"
                                                },
                                                children: t.pedidos_pagos
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    color: i >= 50 ? "#28a745" : i >= 30 ? "#ffc107" : "#ff6b6b"
                                                },
                                                children: [i, "%"]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "right"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#28a745"
                                                },
                                                children: ["R$ ", r(t.receita_total)]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "right"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    color: "#666"
                                                },
                                                children: ["R$ ", r(s)]
                                            })
                                        })]
                                    }, t.genero)
                                }
                                )
                            })]
                        }), e.jsx("div", {
                            style: {
                                marginTop: "24px",
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                border: "1px solid #e0e0e0"
                            },
                            children: e.jsxs("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    gap: "20px"
                                },
                                children: [e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Total de Pedidos"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#1a1a1a"
                                        },
                                        children: h.generos.reduce( (t, i) => t + i.total_pedidos, 0)
                                    })]
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Pedidos Pagos"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#4CAF50"
                                        },
                                        children: h.generos.reduce( (t, i) => t + i.pedidos_pagos, 0)
                                    })]
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Receita Total"
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#28a745"
                                        },
                                        children: ["R$ ", r(h.generos.reduce( (t, i) => t + i.receita_total, 0))]
                                    })]
                                })]
                            })
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "admin-card",
                    children: [e.jsxs("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            color: "#1a1a1a"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-cake-candles",
                            style: {
                                marginRight: "8px",
                                color: "#FF2B56"
                            }
                        }), "Análise por Faixa Etária"]
                    }), j ? e.jsx("p", {
                        style: {
                            color: "#999",
                            textAlign: "center",
                            padding: "40px 0"
                        },
                        children: "Carregando..."
                    }) : e.jsxs("div", {
                        children: [e.jsxs("table", {
                            className: "admin-table",
                            children: [e.jsx("thead", {
                                children: e.jsxs("tr", {
                                    children: [e.jsx("th", {
                                        children: "Faixa Etária"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "center"
                                        },
                                        children: "Pedidos Gerados"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "center"
                                        },
                                        children: "Pedidos Pagos"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "120px",
                                            textAlign: "center"
                                        },
                                        children: "Conversão"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "180px",
                                            textAlign: "right"
                                        },
                                        children: "Receita Total"
                                    }), e.jsx("th", {
                                        style: {
                                            width: "150px",
                                            textAlign: "right"
                                        },
                                        children: "Ticket Médio"
                                    })]
                                })
                            }), e.jsx("tbody", {
                                children: h.faixasEtarias.map( (t, i) => {
                                    const s = t.total_pedidos > 0 ? (t.pedidos_pagos / t.total_pedidos * 100).toFixed(1) : 0
                                      , n = t.pedidos_pagos > 0 ? t.receita_total / t.pedidos_pagos : 0
                                      , d = ["#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4", "#009688", "#4CAF50"]
                                      , a = t.faixa === "Não Consta"
                                      , x = a ? "#FF9800" : d[i % d.length];
                                    return e.jsxs("tr", {
                                        children: [e.jsx("td", {
                                            children: e.jsxs("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "12px"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        width: "45px",
                                                        height: "45px",
                                                        borderRadius: "50%",
                                                        background: `${x}20`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        color: x,
                                                        fontSize: a ? "20px" : "13px",
                                                        fontWeight: "bold"
                                                    },
                                                    children: a ? e.jsx("i", {
                                                        className: "fa-solid fa-question-circle"
                                                    }) : t.faixa
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontWeight: "600",
                                                        fontSize: "16px",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: a ? t.faixa : `${t.faixa} anos`
                                                })]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsx("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#666"
                                                },
                                                children: t.total_pedidos
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsx("div", {
                                                style: {
                                                    fontSize: "18px",
                                                    fontWeight: "bold",
                                                    color: "#4CAF50"
                                                },
                                                children: t.pedidos_pagos
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "center"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                    color: s >= 50 ? "#28a745" : s >= 30 ? "#ffc107" : "#ff6b6b"
                                                },
                                                children: [s, "%"]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "right"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "16px",
                                                    fontWeight: "600",
                                                    color: "#28a745"
                                                },
                                                children: ["R$ ", r(t.receita_total)]
                                            })
                                        }), e.jsx("td", {
                                            style: {
                                                textAlign: "right"
                                            },
                                            children: e.jsxs("div", {
                                                style: {
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    color: "#666"
                                                },
                                                children: ["R$ ", r(n)]
                                            })
                                        })]
                                    }, t.faixa)
                                }
                                )
                            })]
                        }), e.jsx("div", {
                            style: {
                                marginTop: "24px",
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                border: "1px solid #e0e0e0"
                            },
                            children: e.jsxs("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                    gap: "20px"
                                },
                                children: [e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Total de Pedidos"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#1a1a1a"
                                        },
                                        children: h.faixasEtarias.reduce( (t, i) => t + i.total_pedidos, 0)
                                    })]
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Pedidos Pagos"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#4CAF50"
                                        },
                                        children: h.faixasEtarias.reduce( (t, i) => t + i.pedidos_pagos, 0)
                                    })]
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Receita Total"
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#28a745"
                                        },
                                        children: ["R$ ", r(h.faixasEtarias.reduce( (t, i) => t + i.receita_total, 0))]
                                    })]
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666",
                                            marginBottom: "4px"
                                        },
                                        children: "Faixa Mais Ativa"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "24px",
                                            fontWeight: "bold",
                                            color: "#2196F3"
                                        },
                                        children: `${h.faixasEtarias.reduce( (i, s) => s.pedidos_pagos > i.pedidos_pagos ? s : i, h.faixasEtarias[0] || {
                                            faixa: "-"
                                        }).faixa} anos`
                                    })]
                                })]
                            })
                        })]
                    })]
                })]
            })]
        })]
    })
}
export {E as default};

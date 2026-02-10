import {u as A, r as x, l as I, j as e} from "./index-Z_n8MByG.js";
import {A as M} from "./AdminSidebar-DpwmTKwH.js";
function F() {
    const f = A()
      , [d,m] = x.useState([])
      , [S,z] = x.useState(!0)
      , [b,w] = x.useState({})
      , [h,_] = x.useState({})
      , [u,C] = x.useState({})
      , [a,c] = x.useState(1)
      , y = 30;
    x.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            f("/painelad");
            return
        }
        v()
    }
    , [f]);
    const v = async () => {
        try {
            const n = await fetch("/api/db/carrinhos-abandonados");
            if (n.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                f("/painelad");
                return
            }
            const r = await n.json();
            Array.isArray(r) ? m(r) : (I.error("Resposta da API não é um array:", r),
            m([]))
        } catch {
            m([])
        } finally {
            z(!1)
        }
    }
      , B = async o => {
        if (confirm("Deseja excluir este carrinho abandonado?"))
            try {
                const n = "/api/db"
                  , r = localStorage.getItem("form_key")
                  , t = await fetch(`${n}/carrinhos-abandonados/${o}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...r && {
                            "X-CSRF-Token": r
                        }
                    }
                });
                if (t.status === 401) {
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("app_state"),
                    localStorage.removeItem("form_key"),
                    f("/painelad");
                    return
                }
                t.ok && (alert("Carrinho excluído com sucesso!"),
                v())
            } catch {
                alert("Erro ao excluir carrinho")
            }
    }
      , R = o => new Date(o).toLocaleString("pt-BR")
      , g = o => o.toFixed(2).replace(".", ",")
      , T = o => {
        const n = new Date
          , r = new Date(o)
          , t = n - r
          , i = Math.floor(t / 1e3 / 60)
          , p = Math.floor(i / 60)
          , l = Math.floor(p / 24);
        return l > 0 ? `${l} dia${l > 1 ? "s" : ""} atrás` : p > 0 ? `${p} hora${p > 1 ? "s" : ""} atrás` : i > 0 ? `${i} minuto${i > 1 ? "s" : ""} atrás` : "Agora mesmo"
    }
      , W = o => {
        const n = new Date
          , r = new Date(o)
          , t = n - r
          , i = Math.floor(t / 1e3 / 60 / 60);
        return i < 1 ? "#28a745" : i < 6 ? "#ffc107" : "#dc3545"
    }
      , s = Math.ceil(d.length / y)
      , j = (a - 1) * y
      , k = j + y
      , N = d.slice(j, k);
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(M, {}), e.jsxs("div", {
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
                    marginBottom: "24px"
                },
                children: "Carrinhos Abandonados"
            }), S ? e.jsx("p", {
                style: {
                    color: "#666"
                },
                children: "Carregando carrinhos..."
            }) : d.length === 0 ? e.jsx("div", {
                style: {
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#999"
                },
                children: e.jsx("p", {
                    children: "Nenhum carrinho abandonado encontrado"
                })
            }) : e.jsxs(e.Fragment, {
                children: [e.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                        padding: "12px 16px",
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    },
                    children: [e.jsxs("div", {
                        style: {
                            fontSize: "14px",
                            color: "#666"
                        },
                        children: ["Mostrando ", e.jsx("strong", {
                            children: j + 1
                        }), " a ", e.jsx("strong", {
                            children: Math.min(k, d.length)
                        }), " de ", e.jsx("strong", {
                            children: d.length
                        }), " carrinhos"]
                    }), e.jsxs("div", {
                        style: {
                            fontSize: "14px",
                            color: "#666"
                        },
                        children: ["Página ", e.jsx("strong", {
                            children: a
                        }), " de ", e.jsx("strong", {
                            children: s
                        })]
                    })]
                }), e.jsxs("div", {
                    style: {
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px"
                    },
                    children: [e.jsxs("div", {
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "13px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Total de Carrinhos"
                        }), e.jsx("div", {
                            style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#1a1a1a"
                            },
                            children: d.length
                        })]
                    }), e.jsxs("div", {
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "13px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Com Dados de Contato"
                        }), e.jsx("div", {
                            style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#28a745"
                            },
                            children: d.filter(o => o.cliente_email || o.cliente_telefone).length
                        })]
                    }), e.jsxs("div", {
                        children: [e.jsx("div", {
                            style: {
                                fontSize: "13px",
                                color: "#666",
                                marginBottom: "4px"
                            },
                            children: "Valor Total"
                        }), e.jsxs("div", {
                            style: {
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#007bff"
                            },
                            children: ["R$ ", g(d.reduce( (o, n) => o + n.total, 0))]
                        })]
                    })]
                }), e.jsx("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    },
                    children: N.map(o => {
                        const n = JSON.parse(o.itens)
                          , r = o.cliente_email || o.cliente_telefone;
                        return e.jsxs("div", {
                            style: {
                                background: "white",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                borderLeft: `4px solid ${r ? "#28a745" : "#ffc107"}`,
                                overflow: "hidden"
                            },
                            children: [e.jsxs("div", {
                                onClick: () => {
                                    w(t => ({
                                        ...t,
                                        [o.id]: !t[o.id]
                                    }))
                                }
                                ,
                                style: {
                                    padding: "24px",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "start"
                                },
                                onMouseOver: t => t.currentTarget.style.background = "#f8f9fa",
                                onMouseOut: t => t.currentTarget.style.background = "white",
                                children: [e.jsxs("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: [e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "8px"
                                        },
                                        children: [e.jsx("i", {
                                            className: `fa-solid fa-chevron-${b[o.id] ? "down" : "right"}`,
                                            style: {
                                                fontSize: "14px",
                                                marginRight: "12px",
                                                color: "#999"
                                            }
                                        }), e.jsx("div", {
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#1a1a1a"
                                            },
                                            children: o.cliente_nome || (o.tracking_ip ? `(Anônimo) - IP: ${o.tracking_ip}` : "Cliente Anônimo")
                                        })]
                                    }), e.jsxs("div", {
                                        style: {
                                            marginLeft: "26px"
                                        },
                                        children: [e.jsxs("div", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#666",
                                                marginBottom: "4px"
                                            },
                                            children: ["Última atividade: ", e.jsx("span", {
                                                style: {
                                                    fontWeight: "500",
                                                    color: W(o.ultima_atividade)
                                                },
                                                children: T(o.ultima_atividade)
                                            })]
                                        }), e.jsxs("div", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#666"
                                            },
                                            children: ["Criado em: ", R(o.data_criacao)]
                                        })]
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        textAlign: "right"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            display: "inline-block",
                                            padding: "4px 12px",
                                            background: r ? "#d4edda" : "#fff3cd",
                                            color: r ? "#155724" : "#856404",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            marginBottom: "8px"
                                        },
                                        children: r ? "Com Contato" : "Sem Contato"
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#1a1a1a"
                                        },
                                        children: ["R$ ", g(o.total)]
                                    })]
                                })]
                            }), b[o.id] && e.jsxs("div", {
                                style: {
                                    padding: "0 24px 24px 24px"
                                },
                                children: [(o.cliente_email || o.cliente_telefone || o.cliente_cpf) && e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsx("h3", {
                                        style: {
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#666",
                                            marginBottom: "12px"
                                        },
                                        children: "INFORMAÇÕES DE CONTATO"
                                    }), e.jsxs("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                            gap: "12px"
                                        },
                                        children: [o.cliente_email && e.jsxs("div", {
                                            children: [e.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    marginBottom: "2px"
                                                },
                                                children: "Email"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "500"
                                                },
                                                children: o.cliente_email
                                            })]
                                        }), o.cliente_telefone && e.jsxs("div", {
                                            children: [e.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    marginBottom: "2px"
                                                },
                                                children: "Telefone"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "500"
                                                },
                                                children: o.cliente_telefone
                                            })]
                                        }), o.cliente_cpf && e.jsxs("div", {
                                            children: [e.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    marginBottom: "2px"
                                                },
                                                children: "CPF"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "500"
                                                },
                                                children: o.cliente_cpf
                                            })]
                                        })]
                                    }), o.cliente_endereco && e.jsxs("div", {
                                        style: {
                                            marginTop: "12px"
                                        },
                                        children: [e.jsx("div", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#888",
                                                marginBottom: "2px"
                                            },
                                            children: "Endereço"
                                        }), e.jsx("div", {
                                            style: {
                                                fontSize: "14px",
                                                color: "#1a1a1a",
                                                fontWeight: "500"
                                            },
                                            children: o.cliente_endereco
                                        })]
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsx("div", {
                                        onClick: t => {
                                            t.stopPropagation(),
                                            C(i => ({
                                                ...i,
                                                [o.id]: !i[o.id]
                                            }))
                                        }
                                        ,
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "12px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            transition: "background 0.2s",
                                            marginBottom: u[o.id] ? "12px" : "0"
                                        },
                                        onMouseOver: t => t.currentTarget.style.background = "#e9ecef",
                                        onMouseOut: t => t.currentTarget.style.background = "#f8f9fa",
                                        children: e.jsxs("h3", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#666",
                                                margin: 0
                                            },
                                            children: [e.jsx("i", {
                                                className: `fa-solid fa-chevron-${u[o.id] ? "down" : "right"}`,
                                                style: {
                                                    fontSize: "12px",
                                                    marginRight: "8px",
                                                    color: "#999"
                                                }
                                            }), e.jsx("i", {
                                                className: "fa-solid fa-chart-line",
                                                style: {
                                                    marginRight: "8px"
                                                }
                                            }), "DADOS DE RASTREAMENTO"]
                                        })
                                    }), u[o.id] && e.jsx("div", {
                                        style: {
                                            padding: "16px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            border: "1px solid #e0e0e0"
                                        },
                                        children: e.jsxs("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                                                gap: "12px"
                                            },
                                            children: [e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "Facebook Pixel (FBP)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_fbp || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "Facebook Click (FBC)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_fbc || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "TikTok Pixel (TTP)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_ttp || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "TikTok Click ID"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_ttclid || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "UTM Source"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_utm_source || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "UTM Medium"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_utm_medium || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "UTM Campaign"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_utm_campaign || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "UTM Content"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_utm_content || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "UTM Term"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_utm_term || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "IP do Cliente"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_ip || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "User Agent"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.tracking_user_agent || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "URL de Origem"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: o.url_origem || "Não capturado"
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "4px"
                                                    },
                                                    children: "Query String Completa (Location Search)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all",
                                                        background: "#f8f9fa",
                                                        padding: "8px",
                                                        borderRadius: "4px"
                                                    },
                                                    children: o.locationsearch || "Não capturado"
                                                })]
                                            })]
                                        })
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsx("div", {
                                        onClick: t => {
                                            t.stopPropagation(),
                                            _(i => ({
                                                ...i,
                                                [o.id]: !i[o.id]
                                            }))
                                        }
                                        ,
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "12px",
                                            background: "#f8f9fa",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            transition: "background 0.2s",
                                            marginBottom: h[o.id] ? "12px" : "0"
                                        },
                                        onMouseOver: t => t.currentTarget.style.background = "#e9ecef",
                                        onMouseOut: t => t.currentTarget.style.background = "#f8f9fa",
                                        children: e.jsxs("h3", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#666",
                                                margin: 0
                                            },
                                            children: [e.jsx("i", {
                                                className: `fa-solid fa-chevron-${h[o.id] ? "down" : "right"}`,
                                                style: {
                                                    fontSize: "12px",
                                                    marginRight: "8px",
                                                    color: "#999"
                                                }
                                            }), e.jsx("i", {
                                                className: "fa-solid fa-shopping-cart",
                                                style: {
                                                    marginRight: "8px"
                                                }
                                            }), "ITENS DO CARRINHO (", n.length, ")"]
                                        })
                                    }), h[o.id] && e.jsx("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px"
                                        },
                                        children: n.map( (t, i) => e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "12px",
                                                background: "#f8f9fa",
                                                borderRadius: "6px"
                                            },
                                            children: [e.jsxs("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: t.nome
                                                }), t.variacao && e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        marginTop: "2px"
                                                    },
                                                    children: t.variacao
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    textAlign: "right"
                                                },
                                                children: [e.jsxs("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        color: "#666"
                                                    },
                                                    children: [t.quantidade, "x R$ ", g(t.preco)]
                                                }), e.jsxs("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: ["R$ ", g(t.quantidade * t.preco)]
                                                })]
                                            })]
                                        }, i))
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        gap: "8px",
                                        paddingTop: "16px",
                                        borderTop: "1px solid #e0e0e0"
                                    },
                                    children: [o.cliente_email && e.jsx("a", {
                                        href: `mailto:${o.cliente_email}?subject=Complete sua compra!&body=Olá ${o.cliente_nome || "cliente"},%0D%0A%0D%0ANotamos que você deixou itens no carrinho. Complete sua compra agora!`,
                                        style: {
                                            padding: "8px 16px",
                                            background: "#007bff",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            textDecoration: "none",
                                            display: "inline-block"
                                        },
                                        children: "Enviar Email"
                                    }), o.cliente_telefone && ( () => {
                                        const i = (p => {
                                            let l = p.replace(/\D/g, "");
                                            return l.startsWith("55") || (l.startsWith("0") && (l = l.substring(1)),
                                            l.startsWith("55") || (l = "55" + l)),
                                            l
                                        }
                                        )(o.cliente_telefone);
                                        return e.jsx("a", {
                                            href: `https://wa.me/${i}?text=Olá! Notamos que você deixou itens no carrinho. Posso te ajudar a finalizar sua compra?`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                padding: "8px 16px",
                                                background: "#25D366",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                textDecoration: "none",
                                                display: "inline-block"
                                            },
                                            children: "WhatsApp"
                                        })
                                    }
                                    )(), o.recovery_hash && e.jsxs("button", {
                                        onClick: () => {
                                            const t = `${window.location.origin}/r/${o.recovery_hash}`;
                                            navigator.clipboard.writeText(t),
                                            alert("Link de recuperação copiado!")
                                        }
                                        ,
                                        style: {
                                            padding: "8px 16px",
                                            background: "#28a745",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px"
                                        },
                                        children: [e.jsx("i", {
                                            className: "fa-solid fa-link"
                                        }), "Copiar Link"]
                                    }), e.jsx("button", {
                                        onClick: () => B(o.id),
                                        style: {
                                            padding: "8px 16px",
                                            background: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            cursor: "pointer",
                                            marginLeft: o.recovery_hash ? "8px" : "auto"
                                        },
                                        children: "Excluir"
                                    })]
                                })]
                            })]
                        }, o.id)
                    }
                    )
                }), s > 1 && e.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "24px",
                        padding: "20px",
                        background: "white",
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    },
                    children: [e.jsx("button", {
                        onClick: () => c(1),
                        disabled: a === 1,
                        style: {
                            padding: "10px 16px",
                            background: a === 1 ? "#f5f5f5" : "#1a1a1a",
                            color: a === 1 ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: a === 1 ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-angles-left"
                        })
                    }), e.jsx("button", {
                        onClick: () => c(o => Math.max(o - 1, 1)),
                        disabled: a === 1,
                        style: {
                            padding: "10px 16px",
                            background: a === 1 ? "#f5f5f5" : "#1a1a1a",
                            color: a === 1 ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: a === 1 ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-chevron-left"
                        })
                    }), e.jsx("div", {
                        style: {
                            display: "flex",
                            gap: "4px",
                            alignItems: "center"
                        },
                        children: ( () => {
                            let n = Math.max(1, a - Math.floor(2.5))
                              , r = Math.min(s, n + 5 - 1);
                            r - n + 1 < 5 && (n = Math.max(1, r - 5 + 1));
                            const t = [];
                            n > 1 && (t.push(e.jsx("button", {
                                onClick: () => c(1),
                                style: {
                                    padding: "10px 14px",
                                    background: "white",
                                    color: "#1a1a1a",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                },
                                children: "1"
                            }, 1)),
                            n > 2 && t.push(e.jsx("span", {
                                style: {
                                    color: "#999",
                                    padding: "0 4px"
                                },
                                children: "..."
                            }, "ellipsis1")));
                            for (let i = n; i <= r; i++)
                                t.push(e.jsx("button", {
                                    onClick: () => c(i),
                                    style: {
                                        padding: "10px 14px",
                                        background: a === i ? "#1a1a1a" : "white",
                                        color: a === i ? "white" : "#1a1a1a",
                                        border: a === i ? "none" : "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        minWidth: "40px"
                                    },
                                    children: i
                                }, i));
                            return r < s && (r < s - 1 && t.push(e.jsx("span", {
                                style: {
                                    color: "#999",
                                    padding: "0 4px"
                                },
                                children: "..."
                            }, "ellipsis2")),
                            t.push(e.jsx("button", {
                                onClick: () => c(s),
                                style: {
                                    padding: "10px 14px",
                                    background: "white",
                                    color: "#1a1a1a",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                },
                                children: s
                            }, s))),
                            t
                        }
                        )()
                    }), e.jsx("button", {
                        onClick: () => c(o => Math.min(o + 1, s)),
                        disabled: a === s,
                        style: {
                            padding: "10px 16px",
                            background: a === s ? "#f5f5f5" : "#1a1a1a",
                            color: a === s ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: a === s ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-chevron-right"
                        })
                    }), e.jsx("button", {
                        onClick: () => c(s),
                        disabled: a === s,
                        style: {
                            padding: "10px 16px",
                            background: a === s ? "#f5f5f5" : "#1a1a1a",
                            color: a === s ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: a === s ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-angles-right"
                        })
                    })]
                })]
            })]
        })]
    })
}
export {F as default};

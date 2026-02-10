import {u as z, r as o, d as n, j as e} from "./index-Z_n8MByG.js";
import {A as C} from "./AdminSidebar-DpwmTKwH.js";
function A() {
    const m = z()
      , [h,b] = o.useState([])
      , [j,t] = o.useState(!1)
      , [r,g] = o.useState(null)
      , [s,d] = o.useState("")
      , [u,f] = o.useState("tiktok")
      , [a,c] = o.useState("")
      , [x,p] = o.useState(0);
    o.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            m("/painelad");
            return
        }
        l()
    }
    , [m]);
    const l = async () => {
        const i = await n.getAllTrackingScripts();
        b(i)
    }
      , y = () => {
        g(null),
        d(""),
        f("tiktok"),
        c(""),
        p(h.length),
        t(!0)
    }
      , k = i => {
        g(i),
        d(i.nome),
        f(i.tipo),
        c(i.codigo),
        p(i.ordem || 0),
        t(!0)
    }
      , v = i => /^[a-zA-Z0-9]{1,50}$/.test(i)
      , S = async () => {
        if (!s || !a) {
            alert("Preencha o nome e o ID do pixel");
            return
        }
        if (!v(a)) {
            alert("ID do pixel inválido. Use apenas letras e números (máximo 50 caracteres)");
            return
        }
        r ? await n.updateTrackingScript(r.id, {
            nome: s,
            tipo: u,
            codigo: a,
            ativo: r.ativo,
            ordem: parseInt(x) || 0
        }) : await n.insertTrackingScript({
            nome: s,
            tipo: u,
            codigo: a,
            ativo: !0,
            ordem: parseInt(x) || 0
        }),
        t(!1),
        await l()
    }
      , w = async i => {
        await n.toggleTrackingScript(i),
        await l()
    }
      , T = async i => {
        confirm("Tem certeza que deseja excluir este pixel?") && (await n.deleteTrackingScript(i),
        await l())
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(C, {}), e.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "32px",
                background: "#f5f5f5",
                minHeight: "100vh"
            },
            children: [e.jsxs("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "32px"
                },
                children: [e.jsx("h1", {
                    style: {
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#1a1a1a"
                    },
                    children: "Pixels de Tracking"
                }), e.jsx("button", {
                    onClick: y,
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
                    children: "+ Novo Pixel"
                })]
            }), e.jsx("div", {
                className: "admin-table-container",
                children: e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                children: "ID"
                            }), e.jsx("th", {
                                children: "Nome"
                            }), e.jsx("th", {
                                children: "Pixel ID"
                            }), e.jsx("th", {
                                children: "Ordem"
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
                        children: h.map(i => e.jsxs("tr", {
                            children: [e.jsx("td", {
                                children: i.id
                            }), e.jsxs("td", {
                                children: [e.jsx("div", {
                                    className: "admin-product-name",
                                    children: i.nome
                                }), e.jsx("div", {
                                    className: "admin-product-meta",
                                    style: {
                                        fontSize: "12px",
                                        color: "#666"
                                    },
                                    children: "TikTok Pixel"
                                })]
                            }), e.jsx("td", {
                                children: e.jsx("code", {
                                    style: {
                                        background: "#f5f5f5",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        fontFamily: "monospace"
                                    },
                                    children: i.codigo
                                })
                            }), e.jsx("td", {
                                children: i.ordem
                            }), e.jsx("td", {
                                children: e.jsx("button", {
                                    onClick: () => w(i.id),
                                    className: `admin-stock-badge ${i.ativo ? "admin-stock-high" : "admin-stock-low"}`,
                                    style: {
                                        cursor: "pointer",
                                        border: "none"
                                    },
                                    children: i.ativo ? "Ativo" : "Inativo"
                                })
                            }), e.jsx("td", {
                                children: e.jsxs("div", {
                                    className: "admin-actions",
                                    children: [e.jsx("button", {
                                        onClick: () => k(i),
                                        className: "admin-btn admin-btn-primary",
                                        children: "Editar"
                                    }), e.jsx("button", {
                                        onClick: () => T(i.id),
                                        className: "admin-btn admin-btn-danger",
                                        children: "Excluir"
                                    })]
                                })
                            })]
                        }, i.id))
                    })]
                })
            }), e.jsxs("div", {
                style: {
                    marginTop: "24px",
                    padding: "16px 20px",
                    background: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#856404"
                },
                children: [e.jsx("strong", {
                    children: "💡 Nota:"
                }), " Os pixels serão carregados na ordem especificada. Pixels inativos não aparecerão no site. O código do TikTok Pixel é gerado automaticamente a partir do ID fornecido."]
            }), j && e.jsx("div", {
                className: "modal-overlay",
                onClick: () => t(!1),
                children: e.jsxs("div", {
                    className: "modal-content",
                    onClick: i => i.stopPropagation(),
                    style: {
                        maxWidth: "600px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        padding: "32px",
                        borderRadius: "16px",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
                    },
                    children: [e.jsx("button", {
                        className: "modal-close-btn",
                        onClick: () => t(!1),
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
                            children: r ? "Editar Pixel" : "Novo Pixel"
                        }), e.jsx("p", {
                            style: {
                                margin: 0,
                                fontSize: "15px",
                                color: "#666",
                                lineHeight: "1.5"
                            },
                            children: "Configure o TikTok Pixel de tracking"
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
                                children: "Nome do Pixel *"
                            }), e.jsx("input", {
                                type: "text",
                                value: s,
                                onChange: i => d(i.target.value),
                                placeholder: "Ex: TikTok Pixel Principal",
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
                            children: [e.jsx("label", {
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "8px"
                                },
                                children: "Pixel ID *"
                            }), e.jsx("input", {
                                type: "text",
                                value: a,
                                onChange: i => {
                                    const P = i.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 50);
                                    c(P)
                                }
                                ,
                                placeholder: "Digite apenas o ID do pixel (alfanumérico)",
                                maxLength: "50",
                                style: {
                                    fontSize: "14px",
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: "1.5px solid #e0e0e0",
                                    width: "100%",
                                    transition: "border-color 0.2s",
                                    fontFamily: "monospace"
                                }
                            }), e.jsxs("small", {
                                style: {
                                    display: "block",
                                    marginTop: "6px",
                                    color: "#666",
                                    fontSize: "12px"
                                },
                                children: ["Apenas letras e números, máximo 50 caracteres (", a.length, "/50)"]
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
                                children: "Ordem"
                            }), e.jsx("input", {
                                type: "number",
                                value: x,
                                onChange: i => p(i.target.value),
                                placeholder: "0",
                                min: "0",
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
                                children: "Pixels com ordem menor carregam primeiro"
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
                            onClick: () => t(!1),
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
                            onClick: S,
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
                            children: "Salvar Pixel"
                        })]
                    })]
                })
            })]
        })]
    })
}
export {A as default};

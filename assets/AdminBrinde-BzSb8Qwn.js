import {u as B, r as o, d, j as e} from "./index-Z_n8MByG.js";
import {A as k} from "./AdminSidebar-DpwmTKwH.js";
import {O as N} from "./OfertasNavTabs-CIVIrnLK.js";
function E() {
    const g = B()
      , [a,h] = o.useState(null)
      , [f,r] = o.useState(!1)
      , [n,l] = o.useState("")
      , [s,i] = o.useState("")
      , [C,u] = o.useState(!0);
    o.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            g("/painelad", {
                state: {
                    from: "/painelad/brinde"
                }
            });
            return
        }
        c()
    }
    , [g]);
    const c = async () => {
        try {
            u(!0);
            const t = await d.getActiveBrinde();
            h(t),
            t && (l(t.nome || ""),
            i(t.imagem || ""))
        } catch {
            alert("Erro ao carregar dados. Verifique o console para mais detalhes.")
        } finally {
            u(!1)
        }
    }
      , p = () => {
        a ? (l(a.nome || ""),
        i(a.imagem || "")) : (l(""),
        i("")),
        r(!0)
    }
      , y = t => {
        const m = t.target.files[0];
        if (!m)
            return;
        if (!m.type.startsWith("image/")) {
            alert("Por favor, selecione apenas arquivos de imagem");
            return
        }
        if (m.size > 2 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 2MB");
            return
        }
        const x = new FileReader;
        x.onloadend = () => {
            i(x.result)
        }
        ,
        x.onerror = () => {
            alert("Erro ao fazer upload da imagem")
        }
        ,
        x.readAsDataURL(m)
    }
      , b = async () => {
        if (!n || n.trim() === "") {
            alert("Preencha o nome do brinde");
            return
        }
        a ? await d.updateBrinde(a.id, {
            nome: n.trim(),
            imagem: s.trim() || null,
            ativo: a.ativo
        }) : await d.insertBrinde({
            nome: n.trim(),
            imagem: s.trim() || null,
            ativo: !0
        }),
        r(!1),
        await c()
    }
      , j = async () => {
        a && (await d.toggleBrindeAtivo(a.id),
        await c())
    }
      , v = async () => {
        confirm("Deseja realmente excluir este brinde?") && (await d.deleteBrinde(a.id),
        await c())
    }
    ;
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
                    marginBottom: "24px",
                    color: "#1a1a1a"
                },
                children: "Ofertas & Promoções"
            }), e.jsx(N, {}), e.jsxs("div", {
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
                    children: "Brinde"
                }), e.jsx("button", {
                    onClick: p,
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
                    children: a ? "Editar Brinde" : "+ Configurar Brinde"
                })]
            }), e.jsx("div", {
                className: "admin-card",
                children: a ? e.jsx("div", {
                    style: {
                        padding: "24px"
                    },
                    children: e.jsxs("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "24px"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                flex: 1
                            },
                            children: [e.jsx("h2", {
                                style: {
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    marginBottom: "16px",
                                    color: "#1a1a1a"
                                },
                                children: "Brinde Configurado"
                            }), e.jsxs("div", {
                                style: {
                                    marginBottom: "12px"
                                },
                                children: [a.imagem && e.jsx("img", {
                                    src: a.imagem,
                                    alt: a.nome,
                                    style: {
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "12px"
                                    },
                                    onError: t => {
                                        t.target.style.display = "none"
                                    }
                                }), e.jsx("div", {
                                    className: "admin-product-name",
                                    style: {
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        marginBottom: "8px"
                                    },
                                    children: a.nome
                                }), e.jsx("div", {
                                    className: "admin-product-meta",
                                    style: {
                                        fontSize: "14px",
                                        color: "#2E7D32",
                                        fontWeight: "600",
                                        marginTop: "4px"
                                    },
                                    children: "Preço como brinde: R$ 0,00 (Grátis)"
                                })]
                            }), e.jsx("div", {
                                style: {
                                    marginTop: "16px"
                                },
                                children: e.jsx("button", {
                                    onClick: j,
                                    className: `admin-stock-badge ${a.ativo ? "admin-stock-high" : "admin-stock-low"}`,
                                    style: {
                                        cursor: "pointer",
                                        border: "none",
                                        marginRight: "12px"
                                    },
                                    children: a.ativo ? "Ativo" : "Inativo"
                                })
                            })]
                        }), e.jsxs("div", {
                            className: "admin-actions",
                            children: [e.jsx("button", {
                                onClick: p,
                                className: "admin-btn admin-btn-primary",
                                style: {
                                    marginRight: "8px"
                                },
                                children: "Editar"
                            }), e.jsx("button", {
                                onClick: v,
                                className: "admin-btn admin-btn-danger",
                                children: "Excluir"
                            })]
                        })]
                    })
                }) : e.jsxs("div", {
                    style: {
                        padding: "48px",
                        textAlign: "center"
                    },
                    children: [e.jsx("div", {
                        style: {
                            fontSize: "48px",
                            marginBottom: "16px"
                        },
                        children: "🎁"
                    }), e.jsx("h3", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "8px",
                            color: "#1a1a1a"
                        },
                        children: "Nenhum brinde configurado"
                    }), e.jsx("p", {
                        style: {
                            fontSize: "14px",
                            color: "#666",
                            marginBottom: "24px"
                        },
                        children: "Configure um produto para ser adicionado automaticamente ao carrinho como brinde grátis."
                    }), e.jsx("button", {
                        onClick: p,
                        className: "admin-btn admin-btn-primary",
                        children: "Configurar Brinde"
                    })]
                })
            }), e.jsxs("div", {
                className: "admin-note",
                style: {
                    marginTop: "24px"
                },
                children: [e.jsx("strong", {
                    children: "Nota:"
                }), " O brinde será adicionado automaticamente ao carrinho do cliente com preço zerado (R$ 0,00). Apenas um brinde pode estar ativo por vez. O produto selecionado será adicionado automaticamente sempre que o cliente adicionar qualquer produto ao carrinho."]
            }), f && e.jsx("div", {
                className: "modal-overlay",
                onClick: () => r(!1),
                children: e.jsxs("div", {
                    className: "modal-content",
                    onClick: t => t.stopPropagation(),
                    style: {
                        maxWidth: "500px"
                    },
                    children: [e.jsx("button", {
                        className: "modal-close-btn",
                        onClick: () => r(!1),
                        children: e.jsxs("svg", {
                            viewBox: "0 0 24 24",
                            width: "24",
                            height: "24",
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
                    }), e.jsx("h2", {
                        style: {
                            marginBottom: "24px",
                            fontSize: "20px",
                            fontWeight: "600"
                        },
                        children: a ? "Editar Brinde" : "Configurar Brinde"
                    }), e.jsxs("div", {
                        className: "checkout-form-group",
                        style: {
                            marginBottom: "16px"
                        },
                        children: [e.jsx("label", {
                            className: "checkout-form-label",
                            children: "Nome do Brinde *"
                        }), e.jsx("input", {
                            type: "text",
                            value: n,
                            onChange: t => l(t.target.value),
                            placeholder: "Ex: Brinde Especial",
                            className: "checkout-form-input",
                            required: !0
                        })]
                    }), e.jsxs("div", {
                        className: "checkout-form-group",
                        style: {
                            marginBottom: "24px"
                        },
                        children: [e.jsx("label", {
                            className: "checkout-form-label",
                            children: "Imagem do Brinde"
                        }), e.jsxs("div", {
                            style: {
                                marginBottom: "12px"
                            },
                            children: [e.jsx("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: y,
                                style: {
                                    display: "none"
                                },
                                id: "brinde-image-upload"
                            }), e.jsxs("label", {
                                htmlFor: "brinde-image-upload",
                                style: {
                                    display: "inline-block",
                                    padding: "10px 20px",
                                    background: "#007bff",
                                    color: "white",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    transition: "background 0.2s"
                                },
                                onMouseEnter: t => t.target.style.background = "#0056b3",
                                onMouseLeave: t => t.target.style.background = "#007bff",
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-upload",
                                    style: {
                                        marginRight: "8px"
                                    }
                                }), "Upload de Imagem"]
                            })]
                        }), e.jsxs("div", {
                            style: {
                                marginBottom: "12px"
                            },
                            children: [e.jsx("div", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666",
                                    marginBottom: "6px"
                                },
                                children: "Ou cole a URL da imagem:"
                            }), e.jsx("input", {
                                type: "text",
                                value: s,
                                onChange: t => i(t.target.value),
                                placeholder: "https://exemplo.com/imagem.jpg",
                                className: "checkout-form-input"
                            })]
                        }), s && e.jsxs("div", {
                            style: {
                                marginTop: "12px"
                            },
                            children: [e.jsx("img", {
                                src: s,
                                alt: "Preview",
                                style: {
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                    objectFit: "contain"
                                },
                                onError: t => {
                                    t.target.style.display = "none"
                                }
                            }), e.jsx("button", {
                                type: "button",
                                onClick: () => i(""),
                                style: {
                                    marginTop: "8px",
                                    padding: "6px 12px",
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "12px"
                                },
                                children: "Remover Imagem"
                            })]
                        }), e.jsx("div", {
                            style: {
                                marginTop: "8px",
                                fontSize: "12px",
                                color: "#666"
                            },
                            children: "Este brinde será adicionado automaticamente ao carrinho com preço R$ 0,00"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px"
                        },
                        children: [e.jsx("button", {
                            onClick: b,
                            className: "admin-btn admin-btn-primary",
                            style: {
                                flex: 1
                            },
                            children: "Salvar"
                        }), e.jsx("button", {
                            onClick: () => r(!1),
                            className: "admin-btn",
                            style: {
                                flex: 1
                            },
                            children: "Cancelar"
                        })]
                    })]
                })
            })]
        })]
    })
}
export {E as default};

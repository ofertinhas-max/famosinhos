import {u as ge, r as d, d as l, j as t, f as _, g as $} from "./index-Z_n8MByG.js";
import {A as me} from "./AdminSidebar-DpwmTKwH.js";
function ye() {
    const M = ge()
      , [N,U] = d.useState([])
      , [Y,G] = d.useState({})
      , [J,f] = d.useState(!1)
      , [p,O] = d.useState(null)
      , [C,A] = d.useState("")
      , [R,z] = d.useState("")
      , [L,T] = d.useState([])
      , [y,b] = d.useState([])
      , [j,x] = d.useState([])
      , [W,E] = d.useState("")
      , [ue,F] = d.useState("")
      , [g,v] = d.useState(null)
      , [K,w] = d.useState(null)
      , [m,I] = d.useState(!1)
      , [S,k] = d.useState(null)
      , [Q,P] = d.useState(null);
    d.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            M("/adminf3n1x", {
                state: {
                    from: "/adminf3n1x/categorias"
                }
            });
            return
        }
        u()
    }
    , [M]);
    const u = async () => {
        const e = await l.getAllCategorias();
        U(e);
        const o = await l.getAllProdutos()
          , a = {};
        e.forEach(n => {
            a[n.nome] = o.filter(r => r.categoria_ids && r.categoria_ids.includes(n.id)).length
        }
        ),
        G(a)
    }
      , V = async () => {
        O(null),
        A(""),
        z(""),
        F(""),
        b([]),
        x([]),
        E(""),
        I(!1),
        await Z(),
        f(!0)
    }
      , X = async e => {
        O(e),
        A(e.nome),
        z((e.ordem || 0).toString()),
        F(e.nome),
        E("");
        const o = await l.getAllProdutos();
        T(o);
        const n = (await l.getProdutosCategoria(e.id)).map(r => r.id);
        b(n),
        x(n),
        I(!1),
        f(!0)
    }
      , Z = async () => {
        const e = await l.getAllProdutos();
        T(e)
    }
      , ee = async () => {
        if (!C.trim()) {
            alert("Digite o nome da categoria");
            return
        }
        try {
            if (p) {
                const e = C.trim()
                  , o = await l.updateCategoria(p.id, {
                    nome: e,
                    ativo: p.ativo,
                    ordem: parseInt(R) || 0
                })
                  , a = [...new Set(j)];
                await l.atualizarProdutosCategoria(p.id, a)
            } else {
                const e = await l.insertCategoria({
                    nome: C,
                    ativo: 1,
                    ordem: parseInt(R) || 0
                });
                if (y.length > 0) {
                    const o = [...new Set(j)];
                    await l.atualizarProdutosCategoria(e.id, o)
                }
            }
            f(!1),
            await u()
        } catch (e) {
            alert("Erro ao salvar categoria: " + e.message)
        }
    }
      , B = e => {
        b(o => {
            if (o.includes(e)) {
                const a = o.filter(n => n !== e);
                return x(n => n.filter(r => r !== e)),
                a
            } else {
                const a = [...o, e];
                return x(n => n.includes(e) ? n : [...n, e]),
                a
            }
        }
        )
    }
      , H = () => {
        const e = h.map(a => a.id);
        e.every(a => y.includes(a)) ? (b(a => a.filter(n => !e.includes(n))),
        x(a => a.filter(n => !e.includes(n)))) : b(a => {
            const n = e.filter(r => !a.includes(r));
            return x(r => {
                const c = n.filter(s => !r.includes(s));
                return [...r, ...c]
            }
            ),
            [...a, ...n]
        }
        )
    }
      , te = (e, o) => {
        k(o),
        e.dataTransfer.effectAllowed = "move",
        e.target.style.opacity = "0.5"
    }
      , oe = (e, o) => {
        e.preventDefault(),
        e.dataTransfer.dropEffect = "move",
        S !== o && P(o)
    }
      , ae = () => {
        P(null)
    }
      , ne = (e, o) => {
        if (e.preventDefault(),
        P(null),
        !S || S === o) {
            k(null);
            return
        }
        const a = [...j]
          , n = a.findIndex(i => i === S)
          , r = a.findIndex(i => i === o);
        if (n === -1 || r === -1) {
            k(null);
            return
        }
        const [c] = a.splice(n, 1);
        a.splice(r, 0, c);
        const s = [...new Set(a)];
        x(s),
        k(null)
    }
      , re = e => {
        e.target.style.opacity = "1",
        k(null),
        P(null)
    }
      , h = L.filter(e => {
        if (!W)
            return !0;
        const o = W.toLowerCase();
        return e.nome.toLowerCase().includes(o)
    }
    )
      , D = h.length > 0 && h.every(e => y.includes(e.id))
      , ie = async e => {
        await l.toggleCategoriaAtivo(e),
        await u()
    }
      , se = async e => {
        confirm("Deseja realmente excluir esta categoria?") && (await l.deleteCategoria(e),
        await u())
    }
      , de = (e, o) => {
        v(o.id),
        e.dataTransfer.effectAllowed = "move",
        e.dataTransfer.setData("text/html", e.target),
        e.target.style.opacity = "0.5"
    }
      , le = (e, o) => {
        e.preventDefault(),
        e.dataTransfer.dropEffect = "move",
        g !== o.id && w(o.id)
    }
      , ce = () => {
        w(null)
    }
      , pe = async (e, o) => {
        if (e.preventDefault(),
        w(null),
        !g || g === o.id) {
            v(null);
            return
        }
        const a = [...N]
          , n = a.findIndex(s => s.id === g)
          , r = a.findIndex(s => s.id === o.id);
        if (n === -1 || r === -1) {
            v(null);
            return
        }
        const [c] = a.splice(n, 1);
        a.splice(r, 0, c);
        try {
            for (let s = 0; s < a.length; s++)
                await l.updateCategoria(a[s].id, {
                    nome: a[s].nome,
                    ativo: a[s].ativo,
                    ordem: s + 1
                });
            await u()
        } catch (s) {
            alert("Erro ao reordenar categorias: " + s.message),
            await u()
        }
        v(null)
    }
      , xe = e => {
        e.target.style.opacity = "1",
        v(null),
        w(null)
    }
    ;
    return t.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [t.jsx(me, {}), t.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "32px",
                background: "#f5f5f5",
                minHeight: "100vh"
            },
            children: [t.jsxs("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "32px"
                },
                children: [t.jsx("h1", {
                    style: {
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#1a1a1a"
                    },
                    children: "Categorias"
                }), t.jsx("button", {
                    onClick: V,
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
                    children: "+ Nova Categoria"
                })]
            }), t.jsxs("div", {
                className: "admin-card",
                children: [t.jsxs("table", {
                    className: "admin-table",
                    style: {
                        width: "100%",
                        borderCollapse: "collapse"
                    },
                    children: [t.jsx("thead", {
                        children: t.jsxs("tr", {
                            style: {
                                borderBottom: "2px solid #eee"
                            },
                            children: [t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "ID"
                            }), t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "Nome"
                            }), t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "Ordem"
                            }), t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "Produtos"
                            }), t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "left",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "Status"
                            }), t.jsx("th", {
                                style: {
                                    padding: "12px",
                                    textAlign: "center",
                                    fontWeight: "600",
                                    color: "#666"
                                },
                                children: "Ações"
                            })]
                        })
                    }), t.jsx("tbody", {
                        children: N.map(e => t.jsxs("tr", {
                            draggable: g !== null,
                            onDragOver: o => le(o, e),
                            onDragLeave: ce,
                            onDrop: o => pe(o, e),
                            onDragEnd: xe,
                            style: {
                                borderBottom: "1px solid #eee",
                                opacity: g === e.id ? .5 : 1,
                                backgroundColor: K === e.id ? "#e3f2fd" : "transparent",
                                transition: "background-color 0.2s, opacity 0.2s"
                            },
                            children: [t.jsxs("td", {
                                style: {
                                    padding: "12px"
                                },
                                children: [t.jsx("span", {
                                    draggable: !0,
                                    onDragStart: o => de(o, e),
                                    style: {
                                        display: "inline-block",
                                        marginRight: "8px",
                                        cursor: "grab",
                                        userSelect: "none",
                                        fontSize: "18px",
                                        color: "#666",
                                        padding: "4px 8px",
                                        borderRadius: "4px"
                                    },
                                    onMouseEnter: o => o.target.style.backgroundColor = "#f0f0f0",
                                    onMouseLeave: o => o.target.style.backgroundColor = "transparent",
                                    children: "☰"
                                }), e.id]
                            }), t.jsx("td", {
                                style: {
                                    padding: "12px",
                                    fontWeight: "500"
                                },
                                children: e.nome
                            }), t.jsx("td", {
                                style: {
                                    padding: "12px"
                                },
                                children: e.ordem
                            }), t.jsx("td", {
                                style: {
                                    padding: "12px"
                                },
                                children: Y[e.nome] || 0
                            }), t.jsx("td", {
                                style: {
                                    padding: "12px"
                                },
                                children: t.jsx("button", {
                                    onClick: () => ie(e.id),
                                    onMouseDown: o => o.stopPropagation(),
                                    onDragStart: o => o.stopPropagation(),
                                    className: `admin-stock-badge ${e.ativo ? "admin-stock-high" : "admin-stock-low"}`,
                                    style: {
                                        cursor: "pointer",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        background: e.ativo ? "#10b981" : "#ef4444",
                                        color: "white"
                                    },
                                    children: e.ativo ? "Ativa" : "Inativa"
                                })
                            }), t.jsx("td", {
                                style: {
                                    padding: "12px"
                                },
                                children: t.jsxs("div", {
                                    className: "admin-actions",
                                    style: {
                                        display: "flex",
                                        gap: "8px",
                                        justifyContent: "center"
                                    },
                                    onMouseDown: o => o.stopPropagation(),
                                    onDragStart: o => o.stopPropagation(),
                                    children: [t.jsx("button", {
                                        onClick: () => X(e),
                                        className: "admin-btn admin-btn-primary",
                                        style: {
                                            padding: "8px 16px",
                                            background: "#3b82f6",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            cursor: "pointer"
                                        },
                                        children: "Editar"
                                    }), t.jsx("button", {
                                        onClick: () => se(e.id),
                                        className: "admin-btn admin-btn-danger",
                                        style: {
                                            padding: "8px 16px",
                                            background: "#ef4444",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            cursor: "pointer"
                                        },
                                        children: "Excluir"
                                    })]
                                })
                            })]
                        }, e.id))
                    })]
                }), N.length === 0 && t.jsx("div", {
                    style: {
                        padding: "40px",
                        textAlign: "center",
                        color: "#999"
                    },
                    children: 'Nenhuma categoria cadastrada. Clique em "Nova Categoria" para adicionar.'
                })]
            }), t.jsxs("div", {
                className: "admin-note",
                style: {
                    marginTop: "24px"
                },
                children: [t.jsx("strong", {
                    children: "Nota:"
                }), ' As categorias permitem organizar os produtos na loja. O campo "Ordem" define a sequência de exibição (menor número aparece primeiro).']
            })]
        }), J && t.jsx("div", {
            className: "modal-overlay",
            onClick: () => f(!1),
            style: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1e3,
                overflow: "auto",
                padding: "20px"
            },
            children: t.jsxs("div", {
                className: "modal-content",
                onClick: e => e.stopPropagation(),
                style: {
                    background: "white",
                    borderRadius: "12px",
                    padding: "32px",
                    maxWidth: p ? "900px" : "500px",
                    width: "90%",
                    maxHeight: "90vh",
                    overflow: "auto"
                },
                children: [t.jsx("h2", {
                    style: {
                        marginBottom: "24px",
                        fontSize: "20px",
                        fontWeight: "600"
                    },
                    children: p ? "Editar Categoria" : "Nova Categoria"
                }), t.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "16px",
                        marginBottom: "24px"
                    },
                    children: [t.jsxs("div", {
                        className: "checkout-form-group",
                        style: {
                            flex: 1
                        },
                        children: [t.jsx("label", {
                            className: "checkout-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px"
                            },
                            children: "Nome da Categoria"
                        }), t.jsx("input", {
                            type: "text",
                            value: C,
                            onChange: e => A(e.target.value),
                            placeholder: "Ex: Eletrônicos, Moda, Casa...",
                            className: "checkout-form-input",
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }
                        })]
                    }), t.jsxs("div", {
                        className: "checkout-form-group",
                        style: {
                            width: "150px",
                            flexShrink: 0
                        },
                        children: [t.jsx("label", {
                            className: "checkout-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px"
                            },
                            children: "Ordem de Exibição"
                        }), t.jsx("input", {
                            type: "number",
                            value: R,
                            onChange: e => z(e.target.value),
                            placeholder: "0",
                            className: "checkout-form-input",
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }
                        })]
                    })]
                }), p && t.jsxs("div", {
                    style: {
                        marginBottom: "24px",
                        borderTop: "1px solid #eee",
                        paddingTop: "24px"
                    },
                    children: [t.jsxs("div", {
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px"
                        },
                        children: [t.jsx("label", {
                            className: "checkout-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600"
                            },
                            children: "Produtos da Categoria"
                        }), t.jsxs("span", {
                            style: {
                                fontSize: "12px",
                                color: "#666"
                            },
                            children: [y.length, " produto(s) selecionado(s)"]
                        })]
                    }), t.jsx("div", {
                        style: {
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            minHeight: "100px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "8px",
                            marginBottom: "16px",
                            background: "#fafafa"
                        },
                        children: j.length === 0 ? t.jsx("div", {
                            style: {
                                padding: "40px",
                                textAlign: "center",
                                color: "#999"
                            },
                            children: 'Nenhum produto selecionado. Clique em "Adicionar Produto" para começar.'
                        }) : j.map( (e, o) => {
                            const a = L.find(i => i.id === e);
                            if (!a)
                                return null;
                            const r = ( () => {
                                if (!a.imagem)
                                    return null;
                                const i = _(a.imagem);
                                if (i.length === 0)
                                    return null;
                                const q = i[0];
                                return $(q, a.origem) || q
                            }
                            )()
                              , c = S === e
                              , s = Q === e;
                            return t.jsxs("div", {
                                draggable: !0,
                                onDragStart: i => te(i, e),
                                onDragOver: i => oe(i, e),
                                onDragLeave: ae,
                                onDrop: i => ne(i, e),
                                onDragEnd: re,
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px",
                                    marginBottom: "8px",
                                    borderRadius: "6px",
                                    background: s ? "#e3f2fd" : "white",
                                    border: s ? "2px solid #3b82f6" : "1px solid #ddd",
                                    cursor: "grab",
                                    opacity: c ? .5 : 1,
                                    transition: "all 0.2s"
                                },
                                children: [t.jsx("svg", {
                                    style: {
                                        marginRight: "12px",
                                        width: "20px",
                                        height: "20px",
                                        color: "#999",
                                        cursor: "grab",
                                        flexShrink: 0
                                    },
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    viewBox: "0 0 24 24",
                                    children: t.jsx("path", {
                                        d: "M3 12h18M3 6h18M3 18h18"
                                    })
                                }), r ? t.jsx("img", {
                                    src: r,
                                    alt: a.nome,
                                    style: {
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover",
                                        borderRadius: "6px",
                                        marginRight: "12px",
                                        flexShrink: 0
                                    },
                                    onError: i => {
                                        i.target.src = "https://via.placeholder.com/50"
                                    }
                                }) : t.jsx("div", {
                                    style: {
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "6px",
                                        marginRight: "12px",
                                        background: "#e0e0e0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#999",
                                        fontSize: "10px",
                                        flexShrink: 0
                                    },
                                    children: "Sem img"
                                }), t.jsxs("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: [t.jsx("div", {
                                        style: {
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            marginBottom: "4px"
                                        },
                                        children: a.nome
                                    }), t.jsx("div", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#666"
                                        },
                                        children: a.categorias && a.categorias.length > 0 ? `Categorias: ${a.categorias.map(i => i.nome).join(", ")}` : "Sem categoria"
                                    })]
                                }), t.jsx("button", {
                                    onClick: i => {
                                        i.stopPropagation(),
                                        B(e)
                                    }
                                    ,
                                    style: {
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: "4px",
                                        color: "#ef4444",
                                        display: "flex",
                                        alignItems: "center",
                                        marginLeft: "8px"
                                    },
                                    title: "Remover produto",
                                    children: t.jsxs("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [t.jsx("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18"
                                        }), t.jsx("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18"
                                        })]
                                    })
                                })]
                            }, e)
                        }
                        )
                    }), t.jsxs("button", {
                        onClick: () => I(!m),
                        style: {
                            width: "100%",
                            padding: "12px",
                            background: m ? "#f5f5f5" : "#1a1a1a",
                            color: m ? "#333" : "white",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            marginBottom: m ? "16px" : "0"
                        },
                        children: [t.jsxs("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [t.jsx("line", {
                                x1: "12",
                                y1: "5",
                                x2: "12",
                                y2: "19"
                            }), t.jsx("line", {
                                x1: "5",
                                y1: "12",
                                x2: "19",
                                y2: "12"
                            })]
                        }), m ? "Ocultar Lista de Produtos" : "Adicionar Produto"]
                    }), m && t.jsxs(t.Fragment, {
                        children: [t.jsx("div", {
                            style: {
                                marginTop: "16px",
                                marginBottom: "16px"
                            },
                            children: t.jsx("input", {
                                type: "text",
                                value: W,
                                onChange: e => E(e.target.value),
                                placeholder: "Buscar produtos...",
                                className: "checkout-form-input",
                                style: {
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                }
                            })
                        }), t.jsx("div", {
                            style: {
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                maxHeight: "400px",
                                overflowY: "auto",
                                padding: "8px"
                            },
                            children: h.length === 0 ? t.jsx("div", {
                                style: {
                                    padding: "20px",
                                    textAlign: "center",
                                    color: "#999"
                                },
                                children: "Nenhum produto encontrado"
                            }) : t.jsxs(t.Fragment, {
                                children: [t.jsxs("div", {
                                    onClick: H,
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "10px 12px",
                                        marginBottom: "8px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        background: D ? "#e3f2fd" : "#f5f5f5",
                                        border: D ? "2px solid #3b82f6" : "2px solid #ddd",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        transition: "all 0.2s"
                                    },
                                    children: [t.jsx("input", {
                                        type: "checkbox",
                                        checked: D,
                                        onChange: H,
                                        onClick: e => e.stopPropagation(),
                                        style: {
                                            marginRight: "12px",
                                            width: "18px",
                                            height: "18px",
                                            cursor: "pointer",
                                            flexShrink: 0
                                        }
                                    }), t.jsxs("span", {
                                        children: [D ? "Deselecionar todos" : "Selecionar todos", " (", h.length, " produtos)"]
                                    })]
                                }), h.map(e => {
                                    const a = ( () => {
                                        if (!e.imagem)
                                            return null;
                                        const r = _(e.imagem);
                                        if (r.length === 0)
                                            return null;
                                        const c = r[0];
                                        return $(c, e.origem) || c
                                    }
                                    )()
                                      , n = y.includes(e.id);
                                    return t.jsxs("div", {
                                        onClick: () => !n && B(e.id),
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "12px",
                                            marginBottom: "8px",
                                            borderRadius: "6px",
                                            cursor: n ? "not-allowed" : "pointer",
                                            background: n ? "#f0f0f0" : "#f9f9f9",
                                            border: n ? "2px solid #ccc" : "2px solid transparent",
                                            opacity: n ? .6 : 1,
                                            transition: "all 0.2s"
                                        },
                                        children: [t.jsx("input", {
                                            type: "checkbox",
                                            checked: n,
                                            disabled: n,
                                            onChange: () => !n && B(e.id),
                                            onClick: r => r.stopPropagation(),
                                            style: {
                                                marginRight: "12px",
                                                width: "18px",
                                                height: "18px",
                                                cursor: n ? "not-allowed" : "pointer",
                                                flexShrink: 0
                                            }
                                        }), a ? t.jsx("img", {
                                            src: a,
                                            alt: e.nome,
                                            style: {
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                                marginRight: "12px",
                                                flexShrink: 0
                                            },
                                            onError: r => {
                                                r.target.src = "https://via.placeholder.com/50"
                                            }
                                        }) : t.jsx("div", {
                                            style: {
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "6px",
                                                marginRight: "12px",
                                                background: "#e0e0e0",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#999",
                                                fontSize: "10px",
                                                flexShrink: 0
                                            },
                                            children: "Sem img"
                                        }), t.jsxs("div", {
                                            style: {
                                                flex: 1,
                                                minWidth: 0
                                            },
                                            children: [t.jsxs("div", {
                                                style: {
                                                    fontWeight: "500",
                                                    fontSize: "14px",
                                                    marginBottom: "4px"
                                                },
                                                children: [e.nome, n && t.jsx("span", {
                                                    style: {
                                                        marginLeft: "8px",
                                                        fontSize: "12px",
                                                        color: "#999"
                                                    },
                                                    children: "(já adicionado)"
                                                })]
                                            }), t.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#666"
                                                },
                                                children: e.categorias && e.categorias.length > 0 ? `Categorias: ${e.categorias.map(r => r.nome).join(", ")}` : "Sem categoria"
                                            })]
                                        })]
                                    }, e.id)
                                }
                                )]
                            })
                        })]
                    })]
                }), t.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "12px"
                    },
                    children: [t.jsx("button", {
                        onClick: ee,
                        className: "admin-btn admin-btn-primary",
                        style: {
                            flex: 1,
                            padding: "12px",
                            background: "#1a1a1a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer"
                        },
                        children: "Salvar"
                    }), t.jsx("button", {
                        onClick: () => f(!1),
                        className: "admin-btn",
                        style: {
                            flex: 1,
                            padding: "12px",
                            background: "#f5f5f5",
                            color: "#333",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer"
                        },
                        children: "Cancelar"
                    })]
                })]
            })
        })]
    })
}
export {ye as default};

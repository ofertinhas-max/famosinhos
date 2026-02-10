import {u as K, r as s, j as e, L as j, d as f, l as b} from "./index-Z_n8MByG.js";
import {A as Y} from "./AdminSidebar-DpwmTKwH.js";
const v = 10;
function Q() {
    const I = K()
      , [a,y] = s.useState([])
      , [m,L] = s.useState([])
      , [W,B] = s.useState([])
      , [u,A] = s.useState("todos")
      , [g,R] = s.useState("")
      , [n,w] = s.useState(1)
      , [D,P] = s.useState(null)
      , [O,k] = s.useState("")
      , [C,S] = s.useState("")
      , [d,$] = s.useState({
        campo: "id",
        direcao: "desc"
    })
      , [h,z] = s.useState(null);
    s.useEffect( () => {
        if (h) {
            const r = setTimeout( () => z(null), 5e3);
            return () => clearTimeout(r)
        }
    }
    , [h]);
    const p = (r, t="info") => {
        z({
            mensagem: r,
            tipo: t
        })
    }
    ;
    s.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            I("/painelad");
            return
        }
        (async () => {
            const i = await f.getAllProdutos();
            y(i),
            L(i)
        }
        )()
    }
    , [I]),
    s.useEffect( () => {
        let r = [...a];
        if (u === "principais" ? r = a.filter(t => t.principal === 1 || t.principal === !0) : u === "nao-principais" && (r = a.filter(t => !t.principal || t.principal === 0 || t.principal === !1)),
        g.trim()) {
            const t = g.toLowerCase().trim();
            r = r.filter(i => i.nome.toLowerCase().includes(t) || i.categoria && i.categoria.toLowerCase().includes(t))
        }
        r.sort( (t, i) => {
            let l, c;
            return d.campo === "id" ? (l = t.id,
            c = i.id) : d.campo === "nome" ? (l = t.nome.toLowerCase(),
            c = i.nome.toLowerCase()) : d.campo === "preco" && (l = t.preco,
            c = i.preco),
            l < c ? d.direcao === "asc" ? -1 : 1 : l > c ? d.direcao === "asc" ? 1 : -1 : 0
        }
        ),
        L(r),
        w(1)
    }
    , [a, u, g, d]),
    s.useEffect( () => {
        const r = (n - 1) * v
          , t = r + v;
        B(m.slice(r, t))
    }
    , [m, n]);
    const x = Math.ceil(m.length / v)
      , V = r => {
        P(r.id),
        k(r.preco.toFixed(2)),
        S(r.preco_antigo ? r.preco_antigo.toFixed(2) : "")
    }
      , E = () => {
        P(null),
        k(""),
        S("")
    }
      , M = async r => {
        try {
            const t = parseFloat(O)
              , i = C ? parseFloat(C) : null;
            if (isNaN(t) || t <= 0) {
                p("Por favor, insira um preço promocional válido", "error");
                return
            }
            if (C && (isNaN(i) || i <= 0)) {
                p("Por favor, insira um preço original válido", "error");
                return
            }
            if (i && i <= t) {
                p("O preço original deve ser maior que o preço promocional", "error");
                return
            }
            await f.updateProduto(r.id, {
                ...r,
                preco: t,
                preco_antigo: i
            });
            const l = await f.getAllProdutos();
            y(l),
            P(null),
            k(""),
            S("")
        } catch (t) {
            p("Erro ao atualizar preço: " + t.message, "error")
        }
    }
      , _ = async r => {
        if (confirm("Deseja realmente excluir este produto?"))
            try {
                b.log("🗑️ Tentando excluir produto ID:", r);
                const t = await f.deleteProduto(r);
                if (b.log("✅ Resultado da exclusão:", t),
                t.error) {
                    b.error("❌ Erro retornado pela API:", t.error),
                    p("Erro ao deletar produto: " + t.error, "error");
                    return
                }
                if (!t.success) {
                    b.error("❌ Exclusão falhou sem mensagem de erro"),
                    p("Erro ao deletar produto", "error");
                    return
                }
                const i = await f.getAllProdutos();
                y(i),
                p("Produto excluído com sucesso!", "success")
            } catch (t) {
                b.error("Stack trace:", t.stack),
                p("Erro ao deletar produto: " + t.message, "error")
            }
    }
      , H = async r => {
        try {
            const t = !r.principal;
            if (t) {
                const l = a.filter(c => c.id !== r.id && (c.principal === 1 || c.principal === !0));
                if (l.length >= 3 && !confirm(`Você já tem ${l.length} produtos principais. Deseja continuar? (Máximo recomendado: 3)`))
                    return
            }
            await f.updateProduto(r.id, {
                ...r,
                principal: t
            });
            const i = await f.getAllProdutos();
            y(i)
        } catch (t) {
            p("Erro ao atualizar produto principal: " + t.message, "error")
        }
    }
      , q = async () => {
        const r = a.length;
        if (confirm(`⚠️ ATENÇÃO: Esta ação irá deletar TODOS os ${r} produtos permanentemente!

Deseja realmente continuar?`) && confirm("⚠️ ÚLTIMA CONFIRMAÇÃO: Tem certeza absoluta? Esta ação não pode ser desfeita!"))
            try {
                const t = await f.deleteAllProdutos();
                if (t.success)
                    y([]),
                    p(t.message || "Todos os produtos foram deletados!", "success");
                else
                    throw new Error(t.error || "Erro ao deletar produtos")
            } catch (t) {
                p("Erro ao deletar produtos: " + t.message, "error")
            }
    }
      , T = r => {
        $(t => ({
            campo: r,
            direcao: t.campo === r && t.direcao === "desc" ? "asc" : "desc"
        }))
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(Y, {}), e.jsxs("div", {
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
                children: [e.jsxs("div", {
                    children: [e.jsx("h1", {
                        style: {
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#1a1a1a",
                            marginBottom: "8px"
                        },
                        children: "Produtos"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "8px",
                            alignItems: "center"
                        },
                        children: [e.jsxs("span", {
                            style: {
                                fontSize: "14px",
                                color: "#666"
                            },
                            children: [a.filter(r => r.principal === 1 || r.principal === !0).length, " produto(s) principal(is)"]
                        }), a.filter(r => r.principal === 1 || r.principal === !0).length > 3 && e.jsx("span", {
                            style: {
                                fontSize: "12px",
                                color: "#ff9800",
                                background: "#fff3e0",
                                padding: "2px 8px",
                                borderRadius: "4px"
                            },
                            children: "⚠ Máximo recomendado: 3"
                        })]
                    })]
                }), e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "12px"
                    },
                    children: [e.jsxs("button", {
                        onClick: q,
                        disabled: a.length === 0,
                        className: "admin-btn",
                        style: {
                            padding: "12px 24px",
                            background: a.length === 0 ? "#ccc" : "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: a.length === 0 ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [e.jsxs("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [e.jsx("polyline", {
                                points: "3 6 5 6 21 6"
                            }), e.jsx("path", {
                                d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            })]
                        }), "Apagar Todos"]
                    }), e.jsx(j, {
                        to: "/painelad/produtos/novo",
                        children: e.jsx("button", {
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
                            children: "+ Novo Produto"
                        })
                    })]
                })]
            }), e.jsxs("div", {
                style: {
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    background: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0",
                    flexWrap: "wrap"
                },
                children: [e.jsxs("div", {
                    style: {
                        position: "relative",
                        flex: 1,
                        minWidth: "250px",
                        maxWidth: "400px"
                    },
                    children: [e.jsx("input", {
                        type: "text",
                        placeholder: "Buscar por nome ou categoria...",
                        value: g,
                        onChange: r => R(r.target.value),
                        style: {
                            width: "100%",
                            padding: "10px 16px 10px 40px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "6px",
                            fontSize: "14px",
                            outline: "none",
                            transition: "border-color 0.2s"
                        },
                        onFocus: r => r.target.style.borderColor = "#4CAF50",
                        onBlur: r => r.target.style.borderColor = "#e0e0e0"
                    }), e.jsxs("svg", {
                        style: {
                            position: "absolute",
                            left: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "18px",
                            height: "18px",
                            color: "#999",
                            pointerEvents: "none"
                        },
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        viewBox: "0 0 24 24",
                        children: [e.jsx("circle", {
                            cx: "11",
                            cy: "11",
                            r: "8"
                        }), e.jsx("path", {
                            d: "m21 21-4.35-4.35"
                        })]
                    }), g && e.jsx("button", {
                        onClick: () => R(""),
                        style: {
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            display: "flex",
                            alignItems: "center",
                            color: "#999",
                            transition: "color 0.2s"
                        },
                        onMouseEnter: r => r.target.style.color = "#333",
                        onMouseLeave: r => r.target.style.color = "#999",
                        title: "Limpar busca",
                        children: e.jsxs("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [e.jsx("line", {
                                x1: "18",
                                y1: "6",
                                x2: "6",
                                y2: "18"
                            }), e.jsx("line", {
                                x1: "6",
                                y1: "6",
                                x2: "18",
                                y2: "18"
                            })]
                        })
                    })]
                }), e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        alignItems: "center"
                    },
                    children: [e.jsxs("button", {
                        onClick: () => A("todos"),
                        style: {
                            padding: "8px 16px",
                            background: u === "todos" ? "#1a1a1a" : "white",
                            color: u === "todos" ? "white" : "#333",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                        },
                        children: ["Todos (", a.length, ")"]
                    }), e.jsxs("button", {
                        onClick: () => A("principais"),
                        style: {
                            padding: "8px 16px",
                            background: u === "principais" ? "#4CAF50" : "white",
                            color: u === "principais" ? "white" : "#333",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        },
                        children: [e.jsx("svg", {
                            width: "16",
                            height: "16",
                            viewBox: "0 0 24 24",
                            fill: u === "principais" ? "currentColor" : "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: e.jsx("polygon", {
                                points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            })
                        }), "Principais (", a.filter(r => r.principal === 1 || r.principal === !0).length, ")"]
                    }), e.jsxs("button", {
                        onClick: () => A("nao-principais"),
                        style: {
                            padding: "8px 16px",
                            background: u === "nao-principais" ? "#999" : "white",
                            color: u === "nao-principais" ? "white" : "#333",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                        },
                        children: ["Não Principais (", a.filter(r => !r.principal || r.principal === 0).length, ")"]
                    })]
                }), g && e.jsxs("div", {
                    style: {
                        fontSize: "14px",
                        color: "#666",
                        whiteSpace: "nowrap"
                    },
                    children: [m.length, " resultado(s)"]
                })]
            }), e.jsx("div", {
                className: "admin-card",
                children: e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                style: {
                                    textAlign: "center",
                                    width: "80px"
                                },
                                children: "Principal"
                            }), e.jsxs("th", {
                                onClick: () => T("id"),
                                style: {
                                    cursor: "pointer",
                                    userSelect: "none",
                                    transition: "background 0.2s"
                                },
                                onMouseOver: r => r.currentTarget.style.background = "#f0f0f0",
                                onMouseOut: r => r.currentTarget.style.background = "transparent",
                                children: ["ID ", d.campo === "id" ? e.jsx("i", {
                                    className: `fa-solid fa-chevron-${d.direcao === "desc" ? "down" : "up"}`,
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#1a1a1a"
                                    }
                                }) : e.jsx("i", {
                                    className: "fa-solid fa-sort",
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#999"
                                    }
                                })]
                            }), e.jsx("th", {
                                children: "Imagem"
                            }), e.jsxs("th", {
                                onClick: () => T("nome"),
                                style: {
                                    width: "200px",
                                    cursor: "pointer",
                                    userSelect: "none",
                                    transition: "background 0.2s"
                                },
                                onMouseOver: r => r.currentTarget.style.background = "#f0f0f0",
                                onMouseOut: r => r.currentTarget.style.background = "transparent",
                                children: ["Produto ", d.campo === "nome" ? e.jsx("i", {
                                    className: `fa-solid fa-chevron-${d.direcao === "desc" ? "down" : "up"}`,
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#1a1a1a"
                                    }
                                }) : e.jsx("i", {
                                    className: "fa-solid fa-sort",
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#999"
                                    }
                                })]
                            }), e.jsx("th", {
                                children: "Categoria"
                            }), e.jsxs("th", {
                                onClick: () => T("preco"),
                                style: {
                                    cursor: "pointer",
                                    userSelect: "none",
                                    transition: "background 0.2s"
                                },
                                onMouseOver: r => r.currentTarget.style.background = "#f0f0f0",
                                onMouseOut: r => r.currentTarget.style.background = "transparent",
                                children: ["Preço ", d.campo === "preco" ? e.jsx("i", {
                                    className: `fa-solid fa-chevron-${d.direcao === "desc" ? "down" : "up"}`,
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#1a1a1a"
                                    }
                                }) : e.jsx("i", {
                                    className: "fa-solid fa-sort",
                                    style: {
                                        fontSize: "12px",
                                        marginLeft: "4px",
                                        color: "#999"
                                    }
                                })]
                            }), e.jsx("th", {
                                children: "Variações"
                            }), e.jsx("th", {
                                style: {
                                    textAlign: "center"
                                },
                                children: "Ações"
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: W.length === 0 ? e.jsx("tr", {
                            children: e.jsx("td", {
                                colSpan: "8",
                                style: {
                                    textAlign: "center",
                                    padding: "40px",
                                    color: "#999"
                                },
                                children: g ? `Nenhum produto encontrado para "${g}"` : "Nenhum produto encontrado"
                            })
                        }) : W.map(r => {
                            let t = r.imagem;
                            if (typeof t == "string")
                                try {
                                    t = JSON.parse(t)
                                } catch {
                                    t = [t]
                                }
                            Array.isArray(t) || (t = [t]);
                            const i = t.filter(o => o ? !(/\.(mp4|webm|ogg|mov)$/i.test(o) || o.includes("video")) : !1)
                              , l = i.length > 0 ? i[0] : null
                              , c = i.length;
                            return e.jsxs("tr", {
                                children: [e.jsx("td", {
                                    style: {
                                        textAlign: "center"
                                    },
                                    children: e.jsx("svg", {
                                        onClick: () => H(r),
                                        style: {
                                            width: "24px",
                                            height: "24px",
                                            cursor: "pointer",
                                            transition: "transform 0.2s",
                                            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                                        },
                                        viewBox: "0 0 24 24",
                                        fill: r.principal === 1 || r.principal === !0 ? "#FFC107" : "#CCCCCC",
                                        stroke: r.principal === 1 || r.principal === !0 ? "#FFA000" : "#999999",
                                        strokeWidth: "1",
                                        title: r.principal === 1 || r.principal === !0 ? "Produto em destaque na página inicial" : "Marcar como produto principal",
                                        onMouseEnter: o => o.currentTarget.style.transform = "scale(1.15)",
                                        onMouseLeave: o => o.currentTarget.style.transform = "scale(1)",
                                        children: e.jsx("polygon", {
                                            points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                        })
                                    })
                                }), e.jsx("td", {
                                    children: r.id
                                }), e.jsx("td", {
                                    children: l ? e.jsxs(j, {
                                        to: `/painelad/produtos/editar/${r.id}`,
                                        style: {
                                            textDecoration: "none"
                                        },
                                        children: [e.jsx("img", {
                                            src: l,
                                            alt: r.nome,
                                            style: {
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                                border: "2px solid #e0e0e0",
                                                cursor: "pointer",
                                                transition: "transform 0.2s, border-color 0.2s"
                                            },
                                            onMouseEnter: o => {
                                                o.target.style.transform = "scale(1.05)",
                                                o.target.style.borderColor = "#4CAF50"
                                            }
                                            ,
                                            onMouseLeave: o => {
                                                o.target.style.transform = "scale(1)",
                                                o.target.style.borderColor = "#e0e0e0"
                                            }
                                            ,
                                            onError: o => {
                                                o.target.style.display = "none",
                                                o.target.parentElement.innerHTML = '<span style="color: #999; font-size: 12px;">Sem imagem</span>'
                                            }
                                        }), c > 1 && e.jsxs("div", {
                                            style: {
                                                fontSize: "10px",
                                                color: "#666",
                                                marginTop: "4px"
                                            },
                                            children: ["+", c - 1, " ", c - 1 === 1 ? "foto" : "fotos"]
                                        })]
                                    }) : e.jsx("span", {
                                        style: {
                                            color: "#999",
                                            fontSize: "12px"
                                        },
                                        children: "Sem imagem"
                                    })
                                }), e.jsx("td", {
                                    style: {
                                        maxWidth: "200px"
                                    },
                                    children: e.jsxs(j, {
                                        to: `/painelad/produtos/editar/${r.id}`,
                                        style: {
                                            textDecoration: "none",
                                            color: "inherit"
                                        },
                                        children: [e.jsx("div", {
                                            className: "admin-product-name",
                                            style: {
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                cursor: "pointer",
                                                transition: "color 0.2s"
                                            },
                                            onMouseEnter: o => o.target.style.color = "#4CAF50",
                                            onMouseLeave: o => o.target.style.color = "inherit",
                                            children: r.nome
                                        }), e.jsxs("div", {
                                            className: "admin-product-meta",
                                            children: [r.vendidos, " vendidos"]
                                        })]
                                    })
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
                                        children: r.categoria || "Sem categoria"
                                    })
                                }), e.jsx("td", {
                                    children: D === r.id ? e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px"
                                        },
                                        children: [e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px"
                                            },
                                            children: [e.jsx("label", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#666",
                                                    width: "70px"
                                                },
                                                children: "Promocional:"
                                            }), e.jsx("input", {
                                                type: "number",
                                                step: "0.01",
                                                value: O,
                                                onChange: o => k(o.target.value),
                                                placeholder: "0.00",
                                                style: {
                                                    width: "90px",
                                                    padding: "6px 8px",
                                                    border: "2px solid #4CAF50",
                                                    borderRadius: "4px",
                                                    fontSize: "14px"
                                                },
                                                autoFocus: !0,
                                                onKeyDown: o => {
                                                    o.key === "Enter" && M(r),
                                                    o.key === "Escape" && E()
                                                }
                                            })]
                                        }), e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px"
                                            },
                                            children: [e.jsx("label", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#666",
                                                    width: "70px"
                                                },
                                                children: "Original:"
                                            }), e.jsx("input", {
                                                type: "number",
                                                step: "0.01",
                                                value: C,
                                                onChange: o => S(o.target.value),
                                                placeholder: "0.00 (opcional)",
                                                style: {
                                                    width: "90px",
                                                    padding: "6px 8px",
                                                    border: "2px solid #999",
                                                    borderRadius: "4px",
                                                    fontSize: "14px"
                                                },
                                                onKeyDown: o => {
                                                    o.key === "Enter" && M(r),
                                                    o.key === "Escape" && E()
                                                }
                                            })]
                                        }), e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                gap: "6px",
                                                marginTop: "4px"
                                            },
                                            children: [e.jsx("button", {
                                                onClick: () => M(r),
                                                style: {
                                                    padding: "6px 12px",
                                                    background: "#4CAF50",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    flex: 1
                                                },
                                                children: "✓ Salvar"
                                            }), e.jsxs("button", {
                                                onClick: E,
                                                style: {
                                                    padding: "6px 12px",
                                                    background: "#f44336",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    flex: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: "4px"
                                                },
                                                children: [e.jsxs("svg", {
                                                    width: "14",
                                                    height: "14",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    children: [e.jsx("line", {
                                                        x1: "18",
                                                        y1: "6",
                                                        x2: "6",
                                                        y2: "18"
                                                    }), e.jsx("line", {
                                                        x1: "6",
                                                        y1: "6",
                                                        x2: "18",
                                                        y2: "18"
                                                    })]
                                                }), "Cancelar"]
                                            })]
                                        })]
                                    }) : e.jsxs("div", {
                                        onClick: () => V(r),
                                        style: {
                                            cursor: "pointer"
                                        },
                                        title: "Clique para editar os preços",
                                        children: [e.jsxs("div", {
                                            className: "admin-price",
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px"
                                            },
                                            children: ["R$ ", r.preco.toFixed(2), e.jsx("i", {
                                                className: "fa-solid fa-pen-to-square",
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#666",
                                                    opacity: .5
                                                }
                                            })]
                                        }), r.preco_antigo && e.jsxs("div", {
                                            className: "admin-price-old",
                                            children: ["R$ ", r.preco_antigo.toFixed(2)]
                                        })]
                                    })
                                }), e.jsx("td", {
                                    children: e.jsx("span", {
                                        style: {
                                            fontSize: "14px",
                                            color: "#666"
                                        },
                                        children: ( () => {
                                            if (!r.variacoes || !Array.isArray(r.variacoes) || r.variacoes.length === 0)
                                                return e.jsx("span", {
                                                    style: {
                                                        color: "#999"
                                                    },
                                                    children: "-"
                                                });
                                            const o = r.variacoes.reduce( (N, F) => F.opcoes && Array.isArray(F.opcoes) ? N + F.opcoes.length : N, 0);
                                            return e.jsxs("span", {
                                                style: {
                                                    fontWeight: "600",
                                                    color: "#4CAF50"
                                                },
                                                children: [o, " ", o === 1 ? "variação" : "variações"]
                                            })
                                        }
                                        )()
                                    })
                                }), e.jsx("td", {
                                    children: e.jsxs("div", {
                                        className: "admin-actions",
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            justifyContent: "center"
                                        },
                                        children: [e.jsx(j, {
                                            to: `/produto/${r.id}`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: e.jsx("button", {
                                                className: "admin-btn",
                                                style: {
                                                    padding: "8px",
                                                    background: "#2196F3",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "36px",
                                                    height: "36px",
                                                    transition: "all 0.2s"
                                                },
                                                title: "Visualizar produto",
                                                onMouseEnter: o => {
                                                    o.currentTarget.style.background = "#1976D2",
                                                    o.currentTarget.style.transform = "scale(1.05)"
                                                }
                                                ,
                                                onMouseLeave: o => {
                                                    o.currentTarget.style.background = "#2196F3",
                                                    o.currentTarget.style.transform = "scale(1)"
                                                }
                                                ,
                                                children: e.jsxs("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    children: [e.jsx("path", {
                                                        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                    }), e.jsx("circle", {
                                                        cx: "12",
                                                        cy: "12",
                                                        r: "3"
                                                    })]
                                                })
                                            })
                                        }), e.jsx(j, {
                                            to: `/painelad/produtos/editar/${r.id}`,
                                            children: e.jsx("button", {
                                                className: "admin-btn",
                                                style: {
                                                    padding: "8px",
                                                    background: "#4CAF50",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "36px",
                                                    height: "36px",
                                                    transition: "all 0.2s"
                                                },
                                                title: "Editar produto",
                                                onMouseEnter: o => {
                                                    o.currentTarget.style.background = "#45a049",
                                                    o.currentTarget.style.transform = "scale(1.05)"
                                                }
                                                ,
                                                onMouseLeave: o => {
                                                    o.currentTarget.style.background = "#4CAF50",
                                                    o.currentTarget.style.transform = "scale(1)"
                                                }
                                                ,
                                                children: e.jsxs("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    children: [e.jsx("path", {
                                                        d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                                    }), e.jsx("path", {
                                                        d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                                    })]
                                                })
                                            })
                                        }), e.jsx("button", {
                                            onClick: () => _(r.id),
                                            className: "admin-btn",
                                            style: {
                                                padding: "8px",
                                                background: "#f44336",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: "36px",
                                                height: "36px",
                                                transition: "all 0.2s"
                                            },
                                            title: "Excluir produto",
                                            onMouseEnter: o => {
                                                o.currentTarget.style.background = "#d32f2f",
                                                o.currentTarget.style.transform = "scale(1.05)"
                                            }
                                            ,
                                            onMouseLeave: o => {
                                                o.currentTarget.style.background = "#f44336",
                                                o.currentTarget.style.transform = "scale(1)"
                                            }
                                            ,
                                            children: e.jsxs("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                children: [e.jsx("polyline", {
                                                    points: "3 6 5 6 21 6"
                                                }), e.jsx("path", {
                                                    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                                }), e.jsx("line", {
                                                    x1: "10",
                                                    y1: "11",
                                                    x2: "10",
                                                    y2: "17"
                                                }), e.jsx("line", {
                                                    x1: "14",
                                                    y1: "11",
                                                    x2: "14",
                                                    y2: "17"
                                                })]
                                            })
                                        })]
                                    })
                                })]
                            }, r.id)
                        }
                        )
                    })]
                })
            }), x > 1 && e.jsxs("div", {
                style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "24px",
                    padding: "16px",
                    background: "white",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0"
                },
                children: [e.jsxs("div", {
                    style: {
                        fontSize: "14px",
                        color: "#666"
                    },
                    children: ["Mostrando ", (n - 1) * v + 1, " - ", Math.min(n * v, m.length), " de ", m.length, " produto(s)"]
                }), e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        alignItems: "center"
                    },
                    children: [e.jsx("button", {
                        onClick: () => w(r => Math.max(1, r - 1)),
                        disabled: n === 1,
                        style: {
                            padding: "8px 16px",
                            background: n === 1 ? "#f5f5f5" : "#1a1a1a",
                            color: n === 1 ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: n === 1 ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            opacity: n === 1 ? .5 : 1
                        },
                        children: "← Anterior"
                    }), e.jsx("div", {
                        style: {
                            display: "flex",
                            gap: "4px"
                        },
                        children: Array.from({
                            length: Math.min(5, x)
                        }, (r, t) => {
                            let i;
                            return x <= 5 || n <= 3 ? i = t + 1 : n >= x - 2 ? i = x - 4 + t : i = n - 2 + t,
                            e.jsx("button", {
                                onClick: () => w(i),
                                style: {
                                    padding: "8px 12px",
                                    background: n === i ? "#4CAF50" : "white",
                                    color: n === i ? "white" : "#333",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: n === i ? "600" : "400",
                                    minWidth: "40px"
                                },
                                children: i
                            }, i)
                        }
                        )
                    }), e.jsx("button", {
                        onClick: () => w(r => Math.min(x, r + 1)),
                        disabled: n === x,
                        style: {
                            padding: "8px 16px",
                            background: n === x ? "#f5f5f5" : "#1a1a1a",
                            color: n === x ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: n === x ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            opacity: n === x ? .5 : 1
                        },
                        children: "Próxima →"
                    })]
                })]
            }), h && e.jsxs("div", {
                style: {
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    background: h.tipo === "success" ? "#4CAF50" : h.tipo === "error" ? "#f44336" : "#2196F3",
                    color: "white",
                    padding: "16px 24px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    zIndex: 1e4,
                    maxWidth: "400px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    animation: "slideIn 0.3s ease-out"
                },
                children: [e.jsx("div", {
                    style: {
                        fontSize: "20px"
                    },
                    children: h.tipo === "success" ? "✓" : h.tipo === "error" ? "✕" : "ℹ"
                }), e.jsx("div", {
                    style: {
                        flex: 1,
                        fontSize: "14px",
                        fontWeight: "500"
                    },
                    children: h.mensagem
                }), e.jsx("button", {
                    onClick: () => z(null),
                    style: {
                        background: "transparent",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "18px",
                        padding: "4px",
                        opacity: .8,
                        transition: "opacity 0.2s"
                    },
                    onMouseEnter: r => r.target.style.opacity = 1,
                    onMouseLeave: r => r.target.style.opacity = .8,
                    children: "×"
                })]
            })]
        })]
    })
}
export {Q as default};

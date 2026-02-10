import {u as T, r as n, d as S, j as e} from "./index-Z_n8MByG.js";
import {A as $} from "./AdminSidebar-DpwmTKwH.js";
function M() {
    const A = T()
      , [d,w] = n.useState([])
      , [F,q] = n.useState([])
      , [a,B] = n.useState("preco")
      , [h,V] = n.useState("percentual")
      , [i,C] = n.useState("")
      , [l,y] = n.useState("todos")
      , [c,W] = n.useState("")
      , [p,g] = n.useState([])
      , [f,z] = n.useState(!1);
    n.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            A("/adminf3n1x");
            return
        }
        P()
    }
    , [A]);
    const P = async () => {
        const o = await S.getAllProdutos();
        w(o);
        const t = await S.getAllCategorias();
        q(t)
    }
      , E = o => {
        g(t => t.includes(o) ? t.filter(r => r !== o) : [...t, o])
    }
      , N = () => {
        const o = k();
        p.length === o.length ? g([]) : g(o.map(t => t.id))
    }
      , k = () => l === "todos" ? d : l === "categoria" && c ? d.filter(o => o.categoria === c) : l === "selecionados" ? d.filter(o => p.includes(o.id)) : d
      , m = o => {
        const t = parseFloat(i);
        return isNaN(t) ? o : h === "percentual" ? o + o * t / 100 : o + t
    }
      , R = async () => {
        if (!i || parseFloat(i) === 0) {
            alert("Por favor, insira um valor válido");
            return
        }
        let o = [];
        if (l === "todos" ? o = d : l === "categoria" && c ? o = d.filter(s => s.categoria === c) : l === "selecionados" && (o = d.filter(s => p.includes(s.id))),
        o.length === 0) {
            alert("Nenhum produto selecionado para alteração");
            return
        }
        const t = a === "preco" ? "preço" : a === "estoque" ? "estoque" : "vendas"
          , r = h === "percentual" ? i + "%" : (a === "preco" ? "R$ " : "") + i
          , x = `Deseja alterar o ${t} de ${o.length} produto(s)?

Tipo: ${r}`;
        if (confirm(x)) {
            z(!0);
            try {
                for (const s of o) {
                    let j;
                    a === "preco" ? j = s.preco : a === "estoque" ? j = s.estoque || 0 : j = s.vendas || 0;
                    const u = m(j);
                    if (a === "preco" && u <= 0) {
                        console.warn(`Preço inválido para produto ${s.id}, pulando...`);
                        continue
                    }
                    if ((a === "estoque" || a === "vendas") && u < 0) {
                        console.warn(`Valor inválido para produto ${s.id}, pulando...`);
                        continue
                    }
                    const v = {
                        ...s
                    };
                    a === "preco" ? v.preco = u : a === "estoque" ? v.estoque = Math.round(u) : v.vendas = Math.round(u),
                    await S.updateProduto(s.id, v)
                }
                await P(),
                g([]),
                C(""),
                alert(`${o.length} produto(s) atualizado(s) com sucesso!`)
            } catch (s) {
                alert("Erro ao aplicar alterações: " + s.message)
            } finally {
                z(!1)
            }
        }
    }
      , b = k();
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx($, {}), e.jsxs("div", {
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
                    marginBottom: "32px",
                    color: "#1a1a1a"
                },
                children: "Edições em Massa"
            }), e.jsxs("div", {
                className: "admin-card",
                style: {
                    marginBottom: "24px"
                },
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Alterações em Massa"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                        marginBottom: "24px"
                    },
                    children: [e.jsxs("div", {
                        children: [e.jsx("label", {
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Campo a Alterar"
                        }), e.jsxs("select", {
                            value: a,
                            onChange: o => B(o.target.value),
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            },
                            children: [e.jsx("option", {
                                value: "preco",
                                children: "Preço"
                            }), e.jsx("option", {
                                value: "estoque",
                                children: "Estoque"
                            }), e.jsx("option", {
                                value: "vendas",
                                children: "Vendas"
                            })]
                        })]
                    }), e.jsxs("div", {
                        children: [e.jsx("label", {
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Tipo de Alteração"
                        }), e.jsxs("select", {
                            value: h,
                            onChange: o => V(o.target.value),
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            },
                            children: [e.jsx("option", {
                                value: "percentual",
                                children: "Percentual (%)"
                            }), e.jsx("option", {
                                value: "valor",
                                children: a === "preco" ? "Valor (R$)" : "Valor"
                            })]
                        })]
                    }), e.jsxs("div", {
                        children: [e.jsx("label", {
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Valor da Alteração"
                        }), e.jsx("input", {
                            type: "number",
                            step: a === "preco" ? "0.01" : "1",
                            value: i,
                            onChange: o => C(o.target.value),
                            placeholder: h === "percentual" ? "Ex: -10 (redução) ou 10 (aumento)" : a === "preco" ? "Ex: -10.00 (redução) ou 10.00 (aumento)" : "Ex: -10 (redução) ou 10 (aumento)",
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }
                        }), e.jsx("small", {
                            style: {
                                color: "#666",
                                fontSize: "12px",
                                marginTop: "4px",
                                display: "block"
                            },
                            children: "Use valores negativos para reduzir e positivos para aumentar"
                        })]
                    })]
                }), e.jsxs("div", {
                    style: {
                        marginBottom: "24px"
                    },
                    children: [e.jsx("label", {
                        style: {
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "8px",
                            color: "#333"
                        },
                        children: "Aplicar em"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "16px"
                        },
                        children: [e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "radio",
                                value: "todos",
                                checked: l === "todos",
                                onChange: o => y(o.target.value)
                            }), "Todos os produtos"]
                        }), e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "radio",
                                value: "categoria",
                                checked: l === "categoria",
                                onChange: o => y(o.target.value)
                            }), "Por categoria"]
                        }), e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "radio",
                                value: "selecionados",
                                checked: l === "selecionados",
                                onChange: o => y(o.target.value)
                            }), "Produtos selecionados"]
                        })]
                    })]
                }), l === "categoria" && e.jsxs("div", {
                    style: {
                        marginBottom: "24px"
                    },
                    children: [e.jsx("label", {
                        style: {
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "8px",
                            color: "#333"
                        },
                        children: "Selecione a Categoria"
                    }), e.jsxs("select", {
                        value: c,
                        onChange: o => W(o.target.value),
                        style: {
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px"
                        },
                        children: [e.jsx("option", {
                            value: "",
                            children: "Selecione uma categoria..."
                        }), F.map(o => e.jsx("option", {
                            value: o.nome,
                            children: o.nome
                        }, o.id))]
                    })]
                }), e.jsx("button", {
                    onClick: R,
                    disabled: f,
                    style: {
                        padding: "14px 28px",
                        background: f ? "#999" : "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: f ? "not-allowed" : "pointer"
                    },
                    children: f ? "Processando..." : "Aplicar Alterações"
                })]
            }), e.jsxs("div", {
                className: "admin-card",
                children: [e.jsxs("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    },
                    children: [e.jsxs("h2", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "600",
                            color: "#1a1a1a"
                        },
                        children: ["Produtos (", b.length, ")"]
                    }), e.jsx("button", {
                        onClick: N,
                        style: {
                            padding: "8px 16px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer"
                        },
                        children: p.length === b.length ? "Desmarcar Todos" : "Selecionar Todos"
                    })]
                }), e.jsxs("table", {
                    className: "admin-table",
                    children: [e.jsx("thead", {
                        children: e.jsxs("tr", {
                            children: [e.jsx("th", {
                                style: {
                                    width: "50px"
                                },
                                children: "Sel."
                            }), e.jsx("th", {
                                children: "ID"
                            }), e.jsx("th", {
                                children: "Produto"
                            }), e.jsx("th", {
                                children: "Categoria"
                            }), e.jsx("th", {
                                children: "Valor Atual"
                            }), e.jsx("th", {
                                children: "Novo Valor"
                            })]
                        })
                    }), e.jsx("tbody", {
                        children: b.map(o => {
                            let t, r, x = "", s = "";
                            return a === "preco" ? (t = o.preco,
                            r = i ? m(o.preco) : o.preco,
                            x = "R$ ") : a === "estoque" ? (t = o.estoque || 0,
                            r = i ? Math.round(m(o.estoque || 0)) : o.estoque || 0,
                            s = " un.") : (t = o.vendas || 0,
                            r = i ? Math.round(m(o.vendas || 0)) : o.vendas || 0,
                            s = " vendas"),
                            e.jsxs("tr", {
                                children: [e.jsx("td", {
                                    children: e.jsx("input", {
                                        type: "checkbox",
                                        checked: p.includes(o.id),
                                        onChange: () => E(o.id),
                                        style: {
                                            cursor: "pointer"
                                        }
                                    })
                                }), e.jsx("td", {
                                    children: o.id
                                }), e.jsx("td", {
                                    children: o.nome
                                }), e.jsx("td", {
                                    children: o.categoria || "-"
                                }), e.jsxs("td", {
                                    children: [x, a === "preco" ? t.toFixed(2) : t, s]
                                }), e.jsxs("td", {
                                    children: [e.jsxs("span", {
                                        style: {
                                            color: r < t ? "#f44336" : r > t ? "#4CAF50" : "#666",
                                            fontWeight: "600"
                                        },
                                        children: [x, a === "preco" ? r.toFixed(2) : r, s]
                                    }), i && r !== t && e.jsxs("span", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#666",
                                            marginLeft: "8px"
                                        },
                                        children: ["(", r > t ? "+" : "", a === "preco" ? (r - t).toFixed(2) : r - t, ")"]
                                    })]
                                })]
                            }, o.id)
                        }
                        )
                    })]
                })]
            })]
        })]
    })
}
export {M as default};

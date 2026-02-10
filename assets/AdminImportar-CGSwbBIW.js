import {u as S, r as a, j as e, d as k} from "./index-Z_n8MByG.js";
import {A as C} from "./AdminSidebar-DpwmTKwH.js";
function w() {
    var h;
    const l = S();
    a.useEffect( () => {
        localStorage.getItem("app_state") || l("/painelad")
    }
    , [l]);
    const [s,f] = a.useState(null)
      , [n,x] = a.useState(!1)
      , [r,d] = a.useState(null)
      , [u,c] = a.useState(!1)
      , [t,p] = a.useState(null)
      , y = o => {
        const i = o.target.files[0];
        if (i) {
            if (i.type !== "application/json") {
                alert("Por favor, selecione um arquivo JSON válido");
                return
            }
            f(i),
            d(null)
        }
    }
      , j = async () => {
        if (!s) {
            alert("Selecione um arquivo JSON para importar");
            return
        }
        try {
            const o = await s.text()
              , i = JSON.parse(o);
            if (!i.produtos || !Array.isArray(i.produtos))
                throw new Error('Formato inválido. O arquivo deve conter um objeto com a propriedade "produtos" (array)');
            p(i),
            c(!0)
        } catch (o) {
            alert(`Erro ao ler arquivo: ${o.message}`)
        }
    }
      , b = async () => {
        c(!1),
        x(!0),
        d(null);
        try {
            const o = await k.importarProdutos(t);
            if (o.success)
                d(o.resultados);
            else
                throw new Error(o.error || "Erro ao importar produtos")
        } catch (o) {
            alert(`Erro: ${o.message}`)
        } finally {
            x(!1),
            p(null)
        }
    }
      , g = () => {
        c(!1),
        p(null)
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
            children: [e.jsx("div", {
                className: "admin-header",
                style: {
                    marginBottom: "32px"
                },
                children: e.jsx("h1", {
                    children: "Importar Produtos"
                })
            }), e.jsxs("div", {
                style: {
                    maxWidth: "800px"
                },
                children: [e.jsxs("div", {
                    style: {
                        background: "#fff",
                        border: "2px dashed #ddd",
                        padding: "40px",
                        borderRadius: "8px",
                        textAlign: "center",
                        marginBottom: "24px"
                    },
                    children: [e.jsx("input", {
                        type: "file",
                        accept: ".json",
                        onChange: y,
                        style: {
                            display: "none"
                        },
                        id: "file-input"
                    }), e.jsx("label", {
                        htmlFor: "file-input",
                        style: {
                            background: "#FF2B56",
                            color: "white",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            display: "inline-block",
                            fontSize: "16px",
                            fontWeight: "500"
                        },
                        children: "📁 Selecionar arquivo JSON"
                    }), s && e.jsxs("p", {
                        style: {
                            marginTop: "16px",
                            color: "#4CAF50",
                            fontWeight: "500"
                        },
                        children: ["✓ Arquivo selecionado: ", s.name]
                    })]
                }), s && e.jsx("button", {
                    onClick: j,
                    disabled: n,
                    style: {
                        width: "100%",
                        background: n ? "#ccc" : "#1a1a1a",
                        color: "white",
                        border: "none",
                        padding: "16px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: n ? "not-allowed" : "pointer",
                        marginBottom: "24px"
                    },
                    children: n ? "⏳ Importando..." : "🚀 Importar Produtos"
                }), r && e.jsxs("div", {
                    style: {
                        background: r.falhas === 0 ? "#e8f5e9" : "#fff3e0",
                        border: `1px solid ${r.falhas === 0 ? "#4CAF50" : "#FF9800"}`,
                        padding: "20px",
                        borderRadius: "8px"
                    },
                    children: [e.jsx("h3", {
                        style: {
                            marginTop: 0
                        },
                        children: r.falhas === 0 ? "✅ Importação concluída!" : "⚠️ Importação concluída com avisos"
                    }), e.jsxs("div", {
                        style: {
                            fontSize: "16px",
                            lineHeight: "1.8"
                        },
                        children: [e.jsxs("p", {
                            children: [e.jsx("strong", {
                                children: "Total de produtos:"
                            }), " ", r.total]
                        }), e.jsxs("p", {
                            style: {
                                color: "#4CAF50"
                            },
                            children: [e.jsx("strong", {
                                children: "Importados com sucesso:"
                            }), " ", r.sucesso]
                        }), r.falhas > 0 && e.jsxs("p", {
                            style: {
                                color: "#FF9800"
                            },
                            children: [e.jsx("strong", {
                                children: "Falhas:"
                            }), " ", r.falhas]
                        }), r.categorias && r.categorias.criadas > 0 && e.jsxs("p", {
                            style: {
                                color: "#2196F3"
                            },
                            children: [e.jsx("strong", {
                                children: "Categorias criadas:"
                            }), " ", r.categorias.criadas]
                        })]
                    }), r.erros && !!r.erros.length && e.jsxs("div", {
                        style: {
                            marginTop: "16px"
                        },
                        children: [e.jsx("h4", {
                            children: "Erros encontrados:"
                        }), e.jsx("ul", {
                            style: {
                                background: "white",
                                padding: "16px",
                                borderRadius: "6px",
                                fontSize: "14px",
                                lineHeight: "1.6",
                                maxHeight: "200px",
                                overflowY: "auto"
                            },
                            children: r.erros.map( (o, i) => e.jsx("li", {
                                style: {
                                    color: "#d32f2f",
                                    marginBottom: "8px"
                                },
                                children: o
                            }, i))
                        })]
                    }), r.sucesso > 0 && e.jsx("button", {
                        onClick: () => l("/painelad/produtos"),
                        style: {
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500",
                            marginTop: "16px"
                        },
                        children: "Ver produtos importados"
                    })]
                })]
            }), u && t && e.jsx("div", {
                style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999
                },
                onClick: g,
                children: e.jsxs("div", {
                    style: {
                        background: "white",
                        borderRadius: "12px",
                        maxWidth: "700px",
                        width: "90%",
                        maxHeight: "80vh",
                        overflow: "auto",
                        padding: "24px"
                    },
                    onClick: o => o.stopPropagation(),
                    children: [e.jsx("h2", {
                        style: {
                            marginTop: 0,
                            marginBottom: "16px",
                            fontSize: "20px",
                            fontWeight: "600"
                        },
                        children: "Confirmar Importação"
                    }), e.jsxs("p", {
                        style: {
                            marginBottom: "20px",
                            fontSize: "16px",
                            color: "#333"
                        },
                        children: ["Deseja importar ", e.jsxs("strong", {
                            children: [((h = t.produtos) == null ? void 0 : h.length) || 0, " produto(s)"]
                        }), t.categorias && t.categorias.length > 0 && e.jsxs(e.Fragment, {
                            children: [" e ", e.jsxs("strong", {
                                children: [t.categorias.length, " categoria(s)"]
                            })]
                        }), "?"]
                    }), e.jsxs("div", {
                        style: {
                            marginBottom: "20px"
                        },
                        children: [t.categorias && t.categorias.length > 0 && e.jsxs("div", {
                            style: {
                                marginBottom: "16px"
                            },
                            children: [e.jsx("h3", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#666",
                                    marginBottom: "8px"
                                },
                                children: "Categorias a serem importadas:"
                            }), e.jsx("div", {
                                style: {
                                    background: "#f8f9fa",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    fontSize: "13px",
                                    color: "#555"
                                },
                                children: t.categorias.map( (o, i) => e.jsx("span", {
                                    style: {
                                        display: "inline-block",
                                        background: "#fff",
                                        padding: "4px 8px",
                                        margin: "2px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd"
                                    },
                                    children: o.nome
                                }, i))
                            })]
                        }), e.jsx("h3", {
                            style: {
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#666",
                                marginBottom: "12px"
                            },
                            children: "Preview dos primeiros produtos:"
                        }), t.produtos && t.produtos.slice(0, 3).map( (o, i) => {
                            var m;
                            return e.jsx("div", {
                                style: {
                                    background: "#f8f9fa",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    marginBottom: "8px"
                                },
                                children: e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        gap: "12px",
                                        alignItems: "start"
                                    },
                                    children: [o.imagem && e.jsx("img", {
                                        src: Array.isArray(o.imagem) ? o.imagem[0] : o.imagem,
                                        alt: o.nome,
                                        style: {
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "6px",
                                            flexShrink: 0
                                        },
                                        onError: v => v.target.style.display = "none"
                                    }), e.jsxs("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [e.jsx("div", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                marginBottom: "4px"
                                            },
                                            children: o.nome
                                        }), e.jsx("div", {
                                            style: {
                                                fontSize: "13px",
                                                color: "#666",
                                                marginBottom: "4px"
                                            },
                                            children: o.categoria && `Categoria: ${o.categoria}`
                                        }), e.jsxs("div", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#28a745"
                                            },
                                            children: ["R$ ", (m = o.preco) == null ? void 0 : m.toFixed(2).replace(".", ","), o.preco_antigo && e.jsxs("span", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#999",
                                                    textDecoration: "line-through",
                                                    marginLeft: "8px"
                                                },
                                                children: ["R$ ", o.preco_antigo.toFixed(2).replace(".", ",")]
                                            })]
                                        }), o.avaliacoes && o.avaliacoes.length > 0 && e.jsxs("div", {
                                            style: {
                                                fontSize: "12px",
                                                color: "#666",
                                                marginTop: "4px"
                                            },
                                            children: [o.avaliacoes.length, " avaliação(ões)"]
                                        })]
                                    })]
                                })
                            }, i)
                        }
                        ), t.produtos && t.produtos.length > 3 && e.jsxs("div", {
                            style: {
                                fontSize: "13px",
                                color: "#666",
                                marginTop: "8px",
                                fontStyle: "italic"
                            },
                            children: ["... e mais ", t.produtos.length - 3, " produto(s)"]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "24px"
                        },
                        children: [e.jsx("button", {
                            onClick: b,
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Confirmar Importação"
                        }), e.jsx("button", {
                            onClick: g,
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#f5f5f5",
                                color: "#666",
                                border: "1px solid #ddd",
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
        })]
    })
}
export {w as default};

import {u as H, r, d, j as e} from "./index-Z_n8MByG.js";
import {A as q} from "./AdminSidebar-DpwmTKwH.js";
import {O as Y} from "./OfertasNavTabs-CIVIrnLK.js";
function U() {
    const O = H()
      , [C,I] = r.useState([])
      , [D,s] = r.useState(!1)
      , [x,E] = r.useState(null)
      , [T,W] = r.useState(!0)
      , [a,c] = r.useState("")
      , [R,m] = r.useState("0")
      , [F,u] = r.useState("1")
      , [A,f] = r.useState("1")
      , [y,b] = r.useState("pac")
      , [N,_] = r.useState("")
      , [j,v] = r.useState(!0)
      , [B,z] = r.useState("0")
      , [S,k] = r.useState("")
      , [Lt,Ot] = r.useState([])
      , [Pt,qt] = r.useState([])
      , [Rt,mt] = r.useState(!0);
    const diasPorTipo = { pac: 12, full: 2, sedex: 7, gratis: 15 };
    const getRecebaAte = (tipo, prazoMaximo) => {
        const dias = diasPorTipo[tipo] ?? prazoMaximo ?? 1;
        const d = new Date();
        d.setDate(d.getDate() + dias);
        const dia = d.getDate();
        const mes = d.toLocaleString("pt-BR", { month: "long" });
        return `Receba até ${dia} de ${mes}`;
    };
    r.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            O("/painelad", { state: { from: "/painelad/frete" } });
            return;
        }
        p();
    }, [O]);
    r.useEffect(() => {
        if (D) {
            d.getAllProdutos().then(list => Ot(Array.isArray(list) ? list : [])).catch(() => Ot([]));
        }
    }, [D]);
    const p = async () => {
        try {
            W(!0);
            const t = await d.getAllOpcoesFrete();
            I(t)
        } catch {
            alert("Erro ao carregar opções de frete")
        } finally {
            W(!1)
        }
    }
      , M = () => {
        E(null), c(""), m("0"), u("1"), f("1"), b("pac"), _(""), v(!0), z("0"), k(""), qt([]), mt(!0), s(!0);
    }
      , $ = t => {
        var o, i, n, l, w;
        E(t);
        c(t.nome || "");
        m(((o = t.valor) == null ? void 0 : o.toString()) || "0");
        u(((i = t.prazo_minimo) == null ? void 0 : i.toString()) || "1");
        f(((n = t.prazo_maximo) == null ? void 0 : n.toString()) || "1");
        b(t.tipo || "pac");
        _(t.logo || "");
        v(t.ativo === 1);
        z(((l = t.ordem) == null ? void 0 : l.toString()) || "0");
        k(((w = t.valor_original) == null ? void 0 : w.toString()) || "");
        qt(Array.isArray(t.produtos_ids) ? t.produtos_ids.map(Number).filter(n => !isNaN(n)) : []);
        mt(!(t.produtos_ids && t.produtos_ids.length > 0));
        s(!0);
    }
      , L = async () => {
        if (!a || a.trim() === "") {
            alert("Preencha o nome da opção de frete");
            return
        }
        const t = parseFloat(R) || 0
          , o = parseInt(F) || 1
          , i = parseInt(A) || 1
          , n = parseInt(B) || 0
          , l = S ? parseFloat(S) : null;
        if (o > i) {
            alert("O prazo mínimo não pode ser maior que o prazo máximo");
            return
        }
        try {
            const payload = {
                nome: a.trim(),
                valor: t,
                prazo_minimo: o,
                prazo_maximo: i,
                tipo: y,
                logo: N.trim() || null,
                ativo: j,
                ordem: n,
                valor_original: l,
                produtos_ids: Rt ? [] : (Array.isArray(Pt) ? Pt : [])
            };
            if (x) {
                payload.categorias_ids = Array.isArray(x.categorias_ids) ? x.categorias_ids : [];
            }
            x ? await d.updateOpcaoFrete(x.id, payload) : await d.insertOpcaoFrete(payload);
            s(!1);
            await p();
        } catch {
            alert("Erro ao salvar opção de frete")
        }
    }
      , V = async t => {
        if (confirm("Deseja realmente excluir esta opção de frete?"))
            try {
                await d.deleteOpcaoFrete(t),
                await p()
            } catch {
                alert("Erro ao excluir opção de frete")
            }
    }
      , G = async t => {
        try {
            await d.toggleOpcaoFreteAtivo(t),
            await p()
        } catch {
            alert("Erro ao alternar status")
        }
    }
      , X = async (t, o) => {
        try {
            const i = localStorage.getItem("app_state")
              , n = await fetch(`/api/db/opcoes-frete/${t}/reorder`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${i}`
                },
                body: JSON.stringify({ direction: o })
            });
            if (n.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                O("/painelad");
                return
            }
            if (!n.ok)
                throw new Error("Erro ao reordenar");
            const l = await n.json();
            I(l)
        } catch {
            alert("Erro ao reordenar frete")
        }
    }
      , P = t => new Intl.NumberFormat("pt-BR",{
        style: "currency",
        currency: "BRL"
    }).format(t);
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(q, {}), e.jsxs("div", {
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
            }), e.jsx(Y, {}), e.jsxs("div", {
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
                    children: "Opções de Frete"
                }), !D && e.jsx("button", {
                    onClick: M,
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
                    children: "+ Nova Opção de Frete"
                })]
            }), T ? e.jsx("div", {
                style: {
                    textAlign: "center",
                    padding: "48px"
                },
                children: e.jsx("p", {
                    children: "Carregando..."
                })
            }) : C.length === 0 ? e.jsx("div", {
                className: "admin-card",
                children: e.jsxs("div", {
                    style: {
                        padding: "48px",
                        textAlign: "center"
                    },
                    children: [e.jsx("p", {
                        style: {
                            color: "#666",
                            marginBottom: "24px"
                        },
                        children: "Nenhuma opção de frete configurada"
                    }), e.jsx("button", {
                        onClick: M,
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
                        children: "Criar Primeira Opção"
                    })]
                })
            }) : e.jsx("div", {
                className: "admin-card",
                children: e.jsx("div", {
                    style: {
                        padding: "24px"
                    },
                    children: e.jsxs("table", {
                        style: {
                            width: "100%",
                            borderCollapse: "collapse"
                        },
                        children: [e.jsx("thead", {
                            children: e.jsxs("tr", {
                                style: {
                                    borderBottom: "2px solid #e0e0e0"
                                },
                                children: [e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "center",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        width: "80px"
                                    },
                                    children: "Ordem"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Nome"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Entrega"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Valor"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Prazo"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Produtos"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "left",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Status"
                                }), e.jsx("th", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "right",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Ações"
                                })]
                            })
                        }), e.jsx("tbody", {
                            children: C.map(t => e.jsxs("tr", {
                                style: {
                                    borderBottom: "1px solid #e0e0e0"
                                },
                                children: [e.jsx("td", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "center"
                                    },
                                    children: e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "4px",
                                            border: "2px solid #ddd",
                                            borderRadius: "8px",
                                            padding: "4px",
                                            background: "#f9f9f9"
                                        },
                                        children: [e.jsx("button", {
                                            onClick: () => X(t.id, "up"),
                                            disabled: C.indexOf(t) === 0,
                                            style: {
                                                background: "transparent",
                                                border: "none",
                                                cursor: C.indexOf(t) === 0 ? "not-allowed" : "pointer",
                                                padding: "4px 8px",
                                                fontSize: "16px",
                                                color: C.indexOf(t) === 0 ? "#ccc" : "#1a1a1a",
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: "▲"
                                        }), e.jsx("span", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#666",
                                                minWidth: "20px",
                                                textAlign: "center"
                                            },
                                            children: C.indexOf(t) + 1
                                        }), e.jsx("button", {
                                            onClick: () => X(t.id, "down"),
                                            disabled: C.indexOf(t) === C.length - 1,
                                            style: {
                                                background: "transparent",
                                                border: "none",
                                                cursor: C.indexOf(t) === C.length - 1 ? "not-allowed" : "pointer",
                                                padding: "4px 8px",
                                                fontSize: "16px",
                                                color: C.indexOf(t) === C.length - 1 ? "#ccc" : "#1a1a1a",
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: "▼"
                                        })]
                                    })
                                }), e.jsxs("td", {
                                    style: {
                                        padding: "12px",
                                        fontSize: "14px",
                                        color: "#1a1a1a",
                                        fontWeight: "500"
                                    },
                                    children: [t.logo && e.jsx("span", {
                                        style: {
                                            marginRight: "8px"
                                        },
                                        children: t.logo
                                    }), t.nome]
                                }), e.jsx("td", {
                                    style: {
                                        padding: "12px",
                                        fontSize: "14px",
                                        color: "#666"
                                    },
                                    children: getRecebaAte(t.tipo, t.prazo_maximo)
                                }), e.jsx("td", {
                                    style: {
                                        padding: "12px",
                                        fontSize: "14px",
                                        color: "#1a1a1a"
                                    },
                                    children: t.valor === 0 ? e.jsx("span", {
                                        style: {
                                            color: "#2E7D32",
                                            fontWeight: "600"
                                        },
                                        children: "Grátis"
                                    }) : e.jsxs(e.Fragment, {
                                        children: [t.valor_original && e.jsx("span", {
                                            style: {
                                                textDecoration: "line-through",
                                                color: "#999",
                                                marginRight: "8px",
                                                fontSize: "12px"
                                            },
                                            children: P(t.valor_original)
                                        }), P(t.valor)]
                                    })
                                }), e.jsx("td", {
                                    style: {
                                        padding: "12px",
                                        fontSize: "14px",
                                        color: "#666"
                                    },
                                    children: t.prazo_minimo === t.prazo_maximo ? `${t.prazo_minimo} dia${t.prazo_minimo > 1 ? "s" : ""}` : `${t.prazo_minimo}–${t.prazo_maximo} dias`
                                }), e.jsx("td", {
                                    style: { padding: "12px", fontSize: "13px", color: "#666" },
                                    children: (t.produtos_ids && t.produtos_ids.length > 0) ? `${t.produtos_ids.length} produto(s)` : "Todos"
                                }), e.jsx("td", {
                                    style: {
                                        padding: "12px"
                                    },
                                    children: e.jsx("span", {
                                        onClick: () => G(t.id),
                                        style: {
                                            display: "inline-block",
                                            padding: "4px 12px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            background: t.ativo === 1 ? "#E8F5E9" : "#FFEBEE",
                                            color: t.ativo === 1 ? "#2E7D32" : "#C62828"
                                        },
                                        children: t.ativo === 1 ? "Ativo" : "Inativo"
                                    })
                                }), e.jsxs("td", {
                                    style: {
                                        padding: "12px",
                                        textAlign: "right"
                                    },
                                    children: [e.jsx("button", {
                                        onClick: () => $(t),
                                        style: {
                                            padding: "6px 12px",
                                            marginRight: "8px",
                                            background: "#1a1a1a",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            cursor: "pointer"
                                        },
                                        children: "Editar"
                                    }), e.jsx("button", {
                                        onClick: () => V(t.id),
                                        style: {
                                            padding: "6px 12px",
                                            background: "#dc3545",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            cursor: "pointer"
                                        },
                                        children: "Excluir"
                                    })]
                                })]
                            }, t.id))
                        })]
                    })
                })
            }), D && e.jsx("div", {
                className: "admin-card",
                style: {
                    marginBottom: "24px",
                    padding: "24px"
                },
                children: e.jsxs("div", {
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "20px",
                            color: "#1a1a1a"
                        },
                        children: x ? "Editar Opção de Frete" : "Nova Opção de Frete"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        },
                        children: [e.jsxs("div", {
                            children: [e.jsx("label", {
                                style: {
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a"
                                },
                                children: "Nome *"
                            }), e.jsx("input", {
                                type: "text",
                                value: a,
                                onChange: t => c(t.target.value),
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                },
                                placeholder: "Ex: PAC, Frete Grátis"
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px"
                            },
                            children: [e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Valor (R$)"
                                }), e.jsx("input", {
                                    type: "number",
                                    step: "0.01",
                                    value: R,
                                    onChange: t => m(t.target.value),
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    },
                                    placeholder: "0.00"
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Valor Original (R$) - para mostrar riscado"
                                }), e.jsx("input", {
                                    type: "number",
                                    step: "0.01",
                                    value: S,
                                    onChange: t => k(t.target.value),
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    },
                                    placeholder: "Opcional"
                                })]
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "16px"
                            },
                            children: [e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Prazo Mínimo (dias)"
                                }), e.jsx("input", {
                                    type: "number",
                                    min: "1",
                                    value: F,
                                    onChange: t => u(t.target.value),
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    }
                                })]
                            }), e.jsxs("div", {
                                children: [e.jsx("label", {
                                    style: {
                                        display: "block",
                                        marginBottom: "8px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Prazo Máximo (dias)"
                                }), e.jsx("input", {
                                    type: "number",
                                    min: "1",
                                    value: A,
                                    onChange: t => f(t.target.value),
                                    style: {
                                        width: "100%",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    }
                                })]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                style: {
                                    display: "block",
                                    marginBottom: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a"
                                },
                                children: "Tipo"
                            }), e.jsxs("select", {
                                value: y,
                                onChange: t => b(t.target.value),
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                },
                                children: [e.jsx("option", {
                                    value: "pac",
                                    children: "PAC"
                                }), e.jsx("option", {
                                    value: "full",
                                    children: "FULL"
                                }), e.jsx("option", {
                                    value: "sedex",
                                    children: "SEDEX"
                                }), e.jsx("option", {
                                    value: "gratis",
                                    children: "Frete Grátis"
                                })]
                            })]
                        }), e.jsxs("div", {
                            children: [e.jsx("label", {
                                style: { display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1a1a1a" },
                                children: "Disponível para"
                            }), e.jsxs("div", {
                                style: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" },
                                children: [e.jsxs("label", {
                                    style: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#1a1a1a" },
                                    children: [e.jsx("input", {
                                        type: "radio",
                                        name: "disponivelPara",
                                        checked: Rt,
                                        onChange: () => { mt(!0); qt([]); },
                                        style: { width: "16px", height: "16px" }
                                    }), "Todos os produtos"]
                                }), e.jsxs("label", {
                                    style: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#1a1a1a" },
                                    children: [e.jsx("input", {
                                        type: "radio",
                                        name: "disponivelPara",
                                        checked: !Rt,
                                        onChange: () => mt(!1),
                                        style: { width: "16px", height: "16px" }
                                    }), "Apenas produtos selecionados"]
                                })]
                            }), !Rt && Lt.length > 0 && e.jsx("div", {
                                style: { maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px", padding: "12px", background: "#fafafa" },
                                children: Lt.map(p => e.jsxs("label", {
                                    key: p.id,
                                    style: { display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", cursor: "pointer", fontSize: "13px", color: "#333" },
                                    children: [e.jsx("input", {
                                        type: "checkbox",
                                        checked: Pt.includes(p.id),
                                        onChange: () => qt(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id]),
                                        style: { width: "16px", height: "16px" }
                                    }), (p.nome || `Produto #${p.id}`)]
                                }, p.id))
                            }), !Rt && Lt.length === 0 && e.jsx("p", { style: { fontSize: "13px", color: "#757575" }, children: "Carregando produtos..." })]
                        }), e.jsx("div", {
                            children: e.jsxs("label", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#1a1a1a"
                                },
                                children: [e.jsx("input", {
                                    type: "checkbox",
                                    checked: j,
                                    onChange: t => v(t.target.checked),
                                    style: {
                                        width: "18px",
                                        height: "18px"
                                    }
                                }), "Opção ativa (visível no checkout)"]
                            })
                        })]
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                gap: "12px",
                                marginTop: "24px"
                            },
                        children: [e.jsx("button", {
                            onClick: L,
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
                            children: "Salvar"
                        }), e.jsx("button", {
                            onClick: () => s(!1),
                            style: {
                                padding: "12px 24px",
                                background: "#f5f5f5",
                                color: "#1a1a1a",
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
export {U as default};

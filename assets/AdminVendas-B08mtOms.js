import {u as G, r as x, l as ee, j as e} from "./index-Z_n8MByG.js";
import {A as te} from "./AdminSidebar-DpwmTKwH.js";
function ne() {
    const b = G()
      , [u,v] = x.useState([])
      , [W,$] = x.useState(!0)
      , [p,S] = x.useState("todos")
      , [F,D] = x.useState(null)
      , [w,L] = x.useState({})
      , [z,M] = x.useState({})
      , [l,f] = x.useState(1)
      , [j,A] = x.useState("")
      , [k,O] = x.useState(null)
      , [_,q] = x.useState(new Map)
      , R = 30;
    x.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            b("/painelad");
            return
        }
        C(),
        U(),
        T()
    }
    , [b]);
    const U = async () => {
        try {
            const a = await (await fetch("/api/taxas-links")).json();
            a.success && a.taxas && O(a.taxas)
        } catch (t) {
            console.error("Erro ao carregar config de taxas:", t)
        }
    }
      , T = async () => {
        try {
            const s = await (await fetch("/api/db/usuarios-banidos?ativo=1", {
                credentials: "include",
                headers: {
                    "x-restricted-password": "NihbZVhBKv0BAQxkvNeZkrTC1hZZkdAbFPX9Iu2JHSVn9V1JdL"
                }
            })).json();
            if (s.success && s.banimentos) {
                const r = new Map;
                s.banimentos.forEach(d => {
                    d.cpf && r.set(`cpf_${d.cpf}`, d),
                    d.telefone && r.set(`tel_${d.telefone}`, d)
                }
                ),
                q(r)
            }
        } catch (t) {
            console.error("Erro ao carregar usuários banidos:", t)
        }
    }
      , C = async () => {
        try {
            const n = await fetch("/api/db/pedidos?limit=999999");
            if (n.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                b("/painelad");
                return
            }
            const a = await n.json();
            Array.isArray(a) ? v(a) : a.pedidos && Array.isArray(a.pedidos) ? v(a.pedidos) : (ee.error("Resposta da API inválida:", a),
            v([]))
        } catch {
            v([])
        } finally {
            $(!1)
        }
    }
      , V = async (t, n) => {
        try {
            const a = "/api/db"
              , s = localStorage.getItem("form_key")
              , r = await fetch(`${a}/pedidos/${t}/status`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...s && {
                        "X-CSRF-Token": s
                    }
                },
                body: JSON.stringify({
                    status: n
                })
            });
            if (r.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                b("/painelad");
                return
            }
            r.ok && (C(),
            alert("Status atualizado com sucesso!"))
        } catch {
            alert("Erro ao atualizar status")
        }
    }
      , E = t => !t.cliente_cpf && !t.cliente_telefone ? null : t.cliente_cpf && _.has(`cpf_${t.cliente_cpf}`) ? _.get(`cpf_${t.cliente_cpf}`) : t.cliente_telefone && _.has(`tel_${t.cliente_telefone}`) ? _.get(`tel_${t.cliente_telefone}`) : null
      , Z = async t => {
        const n = E(t);
        if (n) {
            if (!confirm(`Confirma o desbloqueio deste cliente?

Cliente: ${t.cliente_nome}
CPF: ${t.cliente_cpf}
Telefone: ${t.cliente_telefone}

Motivo do bloqueio: ${n.motivo}`))
                return;
            try {
                const a = "NihbZVhBKv0BAQxkvNeZkrTC1hZZkdAbFPX9Iu2JHSVn9V1JdL"
                  , s = localStorage.getItem("form_key")
                  , o = await (await fetch(`/api/db/unban-usuario/${n.id}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "x-restricted-password": a,
                        ...s && {
                            "X-CSRF-Token": s
                        }
                    }
                })).json();
                o.success ? (alert("Cliente desbloqueado com sucesso!"),
                T(),
                C()) : alert(`Erro ao desbloquear cliente: ${o.error}`)
            } catch (a) {
                console.error("Erro ao desbloquear cliente:", a),
                alert("Erro ao desbloquear cliente")
            }
        } else {
            const a = prompt(`Confirma o bloqueio deste cliente?

Cliente: ${t.cliente_nome}
CPF: ${t.cliente_cpf}
Telefone: ${t.cliente_telefone}

Digite o motivo do bloqueio:`);
            if (!a)
                return;
            try {
                const s = "NihbZVhBKv0BAQxkvNeZkrTC1hZZkdAbFPX9Iu2JHSVn9V1JdL"
                  , r = localStorage.getItem("form_key")
                  , i = await (await fetch("/api/db/ban-usuario", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "x-restricted-password": s,
                        ...r && {
                            "X-CSRF-Token": r
                        }
                    },
                    body: JSON.stringify({
                        cpf: t.cliente_cpf,
                        telefone: t.cliente_telefone,
                        motivo: a
                    })
                })).json();
                i.success ? (alert(`Cliente bloqueado com sucesso!

${i.pedidos_marcados} pedido(s) atualizado(s).`),
                T(),
                C()) : alert(`Erro ao bloquear cliente: ${i.error}`)
            } catch (s) {
                console.error("Erro ao bloquear cliente:", s),
                alert("Erro ao bloquear cliente")
            }
        }
    }
      , B = t => new Date(t).toLocaleString("pt-BR")
      , g = t => t == null ? "0,00" : Number(t).toFixed(2).replace(".", ",")
      , X = t => {
        if (!k)
            return "";
        const n = []
          , a = ["taxa1", "taxa2", "taxa3", "taxa4", "taxa5"];
        for (let s = 0; s < a.length; s++) {
            const r = a[s]
              , d = k[r];
            if (d && d.ativo) {
                const o = t[s]
                  , i = o && o.status === "pago";
                n.push(i ? "✅" : "❌")
            }
        }
        return n.join("")
    }
      , J = t => {
        switch (t) {
        case "pendente":
            return "#ffc107";
        case "pago":
            return "#28a745";
        case "processando":
            return "#17a2b8";
        case "processando_cartao":
            return "#17a2b8";
        case "esperando_coleta":
            return "#6f42c1";
        case "em_transporte":
            return "#007bff";
        case "entregue":
            return "#20c997";
        case "problemas_na_entrega":
            return "#fd7e14";
        case "em_devolucao":
            return "#e83e8c";
        case "em_analise":
            return "#6c757d";
        case "extornado":
            return "#6c757d";
        case "cancelado":
            return "#dc3545";
        default:
            return "#6c757d"
        }
    }
      , I = t => ({
        pendente: "Pendente",
        pago: "Pago",
        processando: "Processando",
        processando_cartao: "Processando Cartão",
        esperando_coleta: "Aguardando Coleta",
        em_transporte: "Em Transporte",
        entregue: "Entregue",
        problemas_na_entrega: "Problemas na Entrega",
        em_devolucao: "Em Devolução",
        em_analise: "Em Análise",
        extornado: "Extornado",
        cancelado: "Cancelado"
    })[t] || t;
    let h = p === "todos" ? u : u.filter(t => t.status === p);
    if (j.trim()) {
        const t = j.toLowerCase().trim();
        h = h.filter(n => {
            const a = (n.cliente_nome || "").toLowerCase()
              , s = (n.cliente_cpf || "").replace(/[^\d]/g, "")
              , r = (n.cliente_telefone || "").replace(/[^\d]/g, "")
              , d = (n.cliente_email || "").toLowerCase()
              , o = n.id.toString()
              , i = t.replace(/[^\d]/g, "")
              , m = a.includes(t)
              , y = d.includes(t)
              , K = o === t || o.includes(t)
              , Q = i.length > 0 && s.includes(i)
              , Y = i.length > 0 && r.includes(i);
            return m || y || K || Q || Y
        }
        )
    }
    const c = Math.ceil(h.length / R)
      , P = (l - 1) * R
      , N = P + R
      , H = h.slice(P, N);
    return x.useEffect( () => {
        f(1)
    }
    , [p, j]),
    e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(te, {}), e.jsxs("div", {
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
                children: "Vendas"
            }), e.jsx("div", {
                style: {
                    marginBottom: "24px",
                    background: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #e0e0e0"
                },
                children: e.jsxs("div", {
                    style: {
                        position: "relative"
                    },
                    children: [e.jsx("input", {
                        type: "text",
                        placeholder: "Buscar por nome, CPF, telefone, email ou ID do pedido...",
                        value: j,
                        onChange: t => A(t.target.value),
                        style: {
                            width: "100%",
                            padding: "10px 16px 10px 40px",
                            border: "2px solid #e0e0e0",
                            borderRadius: "6px",
                            fontSize: "14px",
                            outline: "none",
                            transition: "border-color 0.2s"
                        },
                        onFocus: t => t.target.style.borderColor = "#4CAF50",
                        onBlur: t => t.target.style.borderColor = "#e0e0e0"
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
                    }), j && e.jsx("button", {
                        onClick: () => A(""),
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
                        onMouseEnter: t => t.target.style.color = "#333",
                        onMouseLeave: t => t.target.style.color = "#999",
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
                })
            }), e.jsxs("div", {
                style: {
                    marginBottom: "24px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap"
                },
                children: [e.jsxs("button", {
                    onClick: () => S("todos"),
                    style: {
                        padding: "8px 16px",
                        background: p === "todos" ? "#007bff" : "white",
                        color: p === "todos" ? "white" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    },
                    children: ["Todos (", u.length, ")"]
                }), e.jsxs("button", {
                    onClick: () => S("pendente"),
                    style: {
                        padding: "8px 16px",
                        background: p === "pendente" ? "#ffc107" : "white",
                        color: p === "pendente" ? "white" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    },
                    children: ["Pendente (", u.filter(t => t.status === "pendente").length, ")"]
                }), e.jsxs("button", {
                    onClick: () => S("pago"),
                    style: {
                        padding: "8px 16px",
                        background: p === "pago" ? "#28a745" : "white",
                        color: p === "pago" ? "white" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    },
                    children: ["Pago (", u.filter(t => t.status === "pago").length, ")"]
                }), e.jsxs("button", {
                    onClick: () => S("cancelado"),
                    style: {
                        padding: "8px 16px",
                        background: p === "cancelado" ? "#dc3545" : "white",
                        color: p === "cancelado" ? "white" : "#333",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    },
                    children: ["Cancelado (", u.filter(t => t.status === "cancelado").length, ")"]
                })]
            }), W ? e.jsx("p", {
                style: {
                    color: "#666"
                },
                children: "Carregando pedidos..."
            }) : h.length === 0 ? e.jsx("div", {
                style: {
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#999"
                },
                children: e.jsx("p", {
                    children: "Nenhum pedido encontrado"
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
                            children: P + 1
                        }), " a ", e.jsx("strong", {
                            children: Math.min(N, h.length)
                        }), " de ", e.jsx("strong", {
                            children: h.length
                        }), " vendas"]
                    }), e.jsxs("div", {
                        style: {
                            fontSize: "14px",
                            color: "#666"
                        },
                        children: ["Página ", e.jsx("strong", {
                            children: l
                        }), " de ", e.jsx("strong", {
                            children: c
                        })]
                    })]
                }), e.jsx("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px"
                    },
                    children: H.map(t => {
                        const n = t.itens || []
                          , a = F === t.id
                          , s = t.status_taxas ? JSON.parse(t.status_taxas) : []
                          , r = X(s)
                          , d = [];
                        if (k && s.length > 0) {
                            const o = ["taxa1", "taxa2", "taxa3", "taxa4", "taxa5"];
                            for (let i = 0; i < o.length; i++) {
                                const m = k[o[i]]
                                  , y = s[i];
                                m && m.ativo && y && d.push({
                                    nome: m.nome || `Taxa ${i + 1}`,
                                    status: y.status || "pendente",
                                    valor: parseFloat(y.valor || m.valor || 0),
                                    data_pagamento: y.data_pagamento || null
                                })
                            }
                        }
                        return e.jsxs("div", {
                            style: {
                                background: "white",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                overflow: "hidden"
                            },
                            children: [e.jsxs("div", {
                                onClick: () => D(a ? null : t.id),
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "20px 24px",
                                    cursor: "pointer",
                                    transition: "background 0.2s",
                                    background: a ? "#f8f9fa" : "transparent"
                                },
                                onMouseOver: o => o.currentTarget.style.background = "#f8f9fa",
                                onMouseOut: o => o.currentTarget.style.background = a ? "#f8f9fa" : "transparent",
                                children: [e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px",
                                        flex: 1
                                    },
                                    children: [e.jsx("i", {
                                        className: `fa-solid fa-chevron-${a ? "down" : "right"}`,
                                        style: {
                                            fontSize: "14px",
                                            color: "#666",
                                            transition: "transform 0.2s"
                                        }
                                    }), e.jsxs("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [e.jsxs("div", {
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                color: "#1a1a1a",
                                                marginBottom: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            },
                                            children: [t.sexo && e.jsx("i", {
                                                className: t.sexo === "MASCULINO" ? "fa-brands fa-black-tie" : t.sexo === "FEMININO" ? "fa-solid fa-person-dress" : "fa-solid fa-question-circle",
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#999",
                                                    opacity: .6
                                                },
                                                title: t.sexo === "MASCULINO" ? "Masculino" : t.sexo === "FEMININO" ? "Feminino" : "Não Consta"
                                            }), e.jsxs("span", {
                                                children: ["Pedido #", t.id, " - ", t.cliente_nome]
                                            })]
                                        }), e.jsxs("div", {
                                            style: {
                                                fontSize: "13px",
                                                color: "#666"
                                            },
                                            children: [B(t.data_criacao), " • ", n.length, " ", n.length === 1 ? "item" : "itens", t.pix_code && e.jsxs("span", {
                                                style: {
                                                    marginLeft: "8px",
                                                    color: "#999",
                                                    fontFamily: "monospace",
                                                    fontSize: "11px"
                                                },
                                                children: ["• PIX: ", t.pix_code.substring(0, 30), "..."]
                                            })]
                                        })]
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            display: "inline-block",
                                            padding: "6px 12px",
                                            background: J(t.status),
                                            color: "white",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            textTransform: "uppercase"
                                        },
                                        children: I(t.status)
                                    }), e.jsx("div", {
                                        style: {
                                            display: "inline-block",
                                            padding: "6px 12px",
                                            background: t.payment_method === "cartao" ? "#007bff" : "#00D09E",
                                            color: "white",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            textTransform: "uppercase"
                                        },
                                        children: t.payment_method === "cartao" ? e.jsxs(e.Fragment, {
                                            children: [e.jsx("i", {
                                                className: "fa-solid fa-credit-card",
                                                style: {
                                                    marginRight: "4px"
                                                }
                                            }), "CARTÃO"]
                                        }) : e.jsxs(e.Fragment, {
                                            children: [e.jsx("i", {
                                                className: "fa-solid fa-qrcode",
                                                style: {
                                                    marginRight: "4px"
                                                }
                                            }), "PIX"]
                                        })
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            color: "#1a1a1a"
                                        },
                                        children: ["R$ ", g(t.total)]
                                    }), r && e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            minWidth: "80px"
                                        },
                                        children: [e.jsx("div", {
                                            style: {
                                                fontSize: "11px",
                                                color: "#999",
                                                marginBottom: "4px",
                                                fontWeight: "600"
                                            },
                                            children: "TAXAS"
                                        }), e.jsx("div", {
                                            style: {
                                                fontSize: "18px",
                                                letterSpacing: "3px"
                                            },
                                            title: "Status das taxas: ✅ = Paga, ❌ = Pendente",
                                            children: r
                                        })]
                                    })]
                                })]
                            }), a && e.jsxs("div", {
                                style: {
                                    padding: "0 24px 24px 24px",
                                    borderTop: "1px solid #e0e0e0"
                                },
                                children: [e.jsxs("div", {
                                    style: {
                                        marginTop: "20px",
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsx("h3", {
                                        style: {
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#666",
                                            marginBottom: "12px"
                                        },
                                        children: "INFORMAÇÕES DO CLIENTE"
                                    }), e.jsxs("div", {
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
                                                    marginBottom: "2px"
                                                },
                                                children: "Nome"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "500"
                                                },
                                                children: t.cliente_nome
                                            })]
                                        }), t.cliente_email && e.jsxs("div", {
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
                                                children: t.cliente_email
                                            })]
                                        }), t.cliente_telefone && e.jsxs("div", {
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
                                                children: t.cliente_telefone
                                            })]
                                        }), e.jsxs("div", {
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
                                                children: t.cliente_cpf || "Não informado"
                                            })]
                                        })]
                                    }), t.cliente_endereco && e.jsxs("div", {
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
                                            children: t.cliente_endereco
                                        })]
                                    }), t.status === "pendente" && (t.cliente_email || t.cliente_telefone) && e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            paddingTop: "16px",
                                            borderTop: "1px solid #e0e0e0"
                                        },
                                        children: [t.cliente_email && e.jsxs("a", {
                                            href: `mailto:${t.cliente_email}?subject=Complete seu pagamento!&body=Olá ${t.cliente_nome},%0D%0A%0D%0ANotamos que seu pedido #${t.id} está com pagamento pendente. Complete o pagamento para garantir sua compra!%0D%0A%0D%0AValor total: R$ ${g(t.total)}%0D%0A%0D%0AQualquer dúvida, estamos à disposição!`,
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
                                            children: [e.jsx("i", {
                                                className: "fa-solid fa-envelope",
                                                style: {
                                                    marginRight: "6px"
                                                }
                                            }), "Enviar Email"]
                                        }), t.cliente_telefone && e.jsxs("a", {
                                            href: `https://wa.me/${t.cliente_telefone.replace(/\D/g, "")}?text=Olá ${t.cliente_nome}! Notamos que seu pedido #${t.id} está com pagamento pendente no valor de R$ ${g(t.total)}. Posso te ajudar a finalizar o pagamento?`,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            style: {
                                                padding: "8px 16px",
                                                background: "#25d366",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "6px",
                                                fontSize: "13px",
                                                fontWeight: "500",
                                                textDecoration: "none",
                                                display: "inline-block"
                                            },
                                            children: [e.jsx("i", {
                                                className: "fa-brands fa-whatsapp",
                                                style: {
                                                    marginRight: "6px"
                                                }
                                            }), "WhatsApp"]
                                        }), ( () => {
                                            const o = E(t);
                                            return e.jsxs("button", {
                                                onClick: () => Z(t),
                                                style: {
                                                    padding: "8px 16px",
                                                    background: o ? "#28a745" : "#dc3545",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "6px",
                                                    fontSize: "13px",
                                                    fontWeight: "500",
                                                    cursor: "pointer"
                                                },
                                                children: [e.jsx("i", {
                                                    className: `fa-solid ${o ? "fa-unlock" : "fa-user-slash"}`,
                                                    style: {
                                                        marginRight: "6px"
                                                    }
                                                }), o ? "Desbloquear" : "Bloquear"]
                                            })
                                        }
                                        )()]
                                    })]
                                }), d.length > 0 && e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsxs("h3", {
                                        style: {
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            color: "#666",
                                            marginBottom: "12px"
                                        },
                                        children: ["TAXAS IMEDIATAS (", d.length, ")"]
                                    }), e.jsx("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px"
                                        },
                                        children: d.map( (o, i) => e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "12px",
                                                background: o.status === "pago" ? "#d4edda" : "#fff3cd",
                                                borderRadius: "6px",
                                                border: o.status === "pago" ? "1px solid #28a745" : "1px solid #ffc107"
                                            },
                                            children: [e.jsxs("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color: "#1a1a1a",
                                                        marginBottom: "4px"
                                                    },
                                                    children: o.nome
                                                }), e.jsxs("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#666"
                                                    },
                                                    children: ["Status: ", e.jsx("span", {
                                                        style: {
                                                            fontWeight: "600",
                                                            color: o.status === "pago" ? "#155724" : "#856404"
                                                        },
                                                        children: o.status === "pago" ? "✅ Pago" : "⚠️ Pendente"
                                                    }), o.data_pagamento && e.jsxs("span", {
                                                        children: [" • Pago em: ", B(o.data_pagamento)]
                                                    })]
                                                })]
                                            }), e.jsx("div", {
                                                style: {
                                                    textAlign: "right"
                                                },
                                                children: e.jsxs("div", {
                                                    style: {
                                                        fontSize: "16px",
                                                        fontWeight: "600",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: ["R$ ", g(o.valor)]
                                                })
                                            })]
                                        }, i))
                                    })]
                                }), e.jsxs("div", {
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
                                        children: "INFORMAÇÕES DE PAGAMENTO"
                                    }), e.jsxs("div", {
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
                                                    marginBottom: "2px"
                                                },
                                                children: "Forma de Pagamento"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "14px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "500"
                                                },
                                                children: t.payment_method === "cartao" ? e.jsxs("span", {
                                                    children: [e.jsx("i", {
                                                        className: "fa-solid fa-credit-card",
                                                        style: {
                                                            marginRight: "6px",
                                                            color: "#007bff"
                                                        }
                                                    }), "Cartão de Crédito", t.installments > 1 && e.jsxs("span", {
                                                        style: {
                                                            color: "#666",
                                                            fontSize: "13px"
                                                        },
                                                        children: [" (", t.installments, "x)"]
                                                    })]
                                                }) : e.jsxs("span", {
                                                    children: [e.jsx("i", {
                                                        className: "fa-solid fa-qrcode",
                                                        style: {
                                                            marginRight: "6px",
                                                            color: "#00D09E"
                                                        }
                                                    }), "PIX"]
                                                })
                                            })]
                                        }), t.pix_payment_id && e.jsxs("div", {
                                            children: [e.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    marginBottom: "2px"
                                                },
                                                children: t.payment_method === "cartao" ? "ID de Rastreamento" : "ID do Pagamento"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "13px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "400",
                                                    fontFamily: "monospace",
                                                    wordBreak: "break-all"
                                                },
                                                children: t.pix_payment_id
                                            })]
                                        }), t.beehive_transaction_id && e.jsxs("div", {
                                            children: [e.jsx("div", {
                                                style: {
                                                    fontSize: "12px",
                                                    color: "#888",
                                                    marginBottom: "2px"
                                                },
                                                children: "Beehive Transaction ID"
                                            }), e.jsx("div", {
                                                style: {
                                                    fontSize: "13px",
                                                    color: "#1a1a1a",
                                                    fontWeight: "400",
                                                    fontFamily: "monospace",
                                                    wordBreak: "break-all"
                                                },
                                                children: t.beehive_transaction_id
                                            })]
                                        })]
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsx("div", {
                                        onClick: o => {
                                            o.stopPropagation(),
                                            M(i => ({
                                                ...i,
                                                [t.id]: !i[t.id]
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
                                            marginBottom: z[t.id] ? "12px" : "0"
                                        },
                                        onMouseOver: o => o.currentTarget.style.background = "#e9ecef",
                                        onMouseOut: o => o.currentTarget.style.background = "#f8f9fa",
                                        children: e.jsxs("h3", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#666",
                                                margin: 0
                                            },
                                            children: [e.jsx("i", {
                                                className: `fa-solid fa-chevron-${z[t.id] ? "down" : "right"}`,
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
                                    }), z[t.id] && e.jsx("div", {
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
                                                        marginBottom: "2px"
                                                    },
                                                    children: "Facebook Pixel (FBP)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.tracking_fbp || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "Facebook Click (FBC)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.tracking_fbc || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "TikTok Pixel (TTP)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.tracking_ttp || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "TikTok Click ID"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.tracking_ttclid || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "Endereço IP"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace"
                                                    },
                                                    children: t.tracking_ip || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "URL de Origem"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#0066cc",
                                                        fontWeight: "400",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.url_origem ? e.jsx("a", {
                                                        href: t.url_origem,
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        style: {
                                                            textDecoration: "none",
                                                            color: "#0066cc"
                                                        },
                                                        children: t.url_origem
                                                    }) : e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "User Agent"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all"
                                                    },
                                                    children: t.tracking_user_agent || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            }), e.jsxs("div", {
                                                style: {
                                                    gridColumn: "1 / -1"
                                                },
                                                children: [e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#888",
                                                        marginBottom: "2px"
                                                    },
                                                    children: "Query String Completa (Location Search)"
                                                }), e.jsx("div", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a",
                                                        fontWeight: "400",
                                                        fontFamily: "monospace",
                                                        wordBreak: "break-all",
                                                        background: "#f8f9fa",
                                                        padding: "8px",
                                                        borderRadius: "4px"
                                                    },
                                                    children: t.locationsearch || e.jsx("span", {
                                                        style: {
                                                            color: "#999",
                                                            fontStyle: "italic"
                                                        },
                                                        children: "Não capturado"
                                                    })
                                                })]
                                            })]
                                        })
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        marginBottom: "20px"
                                    },
                                    children: [e.jsxs("div", {
                                        onClick: o => {
                                            o.stopPropagation(),
                                            L(i => ({
                                                ...i,
                                                [t.id]: !i[t.id]
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
                                            marginBottom: w[t.id] ? "12px" : "0"
                                        },
                                        onMouseOver: o => o.currentTarget.style.background = "#e9ecef",
                                        onMouseOut: o => o.currentTarget.style.background = "#f8f9fa",
                                        children: [e.jsxs("h3", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#666",
                                                margin: 0
                                            },
                                            children: [e.jsx("i", {
                                                className: `fa-solid fa-chevron-${w[t.id] ? "down" : "right"}`,
                                                style: {
                                                    fontSize: "12px",
                                                    marginRight: "8px",
                                                    color: "#999"
                                                }
                                            }), "ITENS DO PEDIDO (", n.length, ")"]
                                        }), e.jsxs("div", {
                                            style: {
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                color: "#1a1a1a"
                                            },
                                            children: ["R$ ", g(t.total)]
                                        })]
                                    }), w[t.id] && e.jsx("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "8px"
                                        },
                                        children: n.map( (o, i) => e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                padding: "12px",
                                                background: "#f8f9fa",
                                                borderRadius: "6px",
                                                border: "1px solid #e0e0e0"
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
                                                    children: o.nome
                                                }), o.variacao && e.jsx("div", {
                                                    style: {
                                                        fontSize: "12px",
                                                        color: "#666",
                                                        marginTop: "2px"
                                                    },
                                                    children: o.variacao
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
                                                    children: [o.quantidade || 0, "x R$ ", g(o.preco)]
                                                }), e.jsxs("div", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: "600",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: ["R$ ", g((o.quantidade || 0) * (o.preco || 0))]
                                                })]
                                            })]
                                        }, i))
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        paddingTop: "16px",
                                        borderTop: "1px solid #e0e0e0"
                                    },
                                    children: [e.jsx("label", {
                                        style: {
                                            display: "block",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            color: "#666",
                                            marginBottom: "8px"
                                        },
                                        children: "Alterar Status do Pedido"
                                    }), e.jsxs("select", {
                                        value: t.status,
                                        onChange: o => {
                                            o.stopPropagation(),
                                            window.confirm(`Alterar status para "${I(o.target.value)}"?`) && V(t.id, o.target.value)
                                        }
                                        ,
                                        style: {
                                            width: "100%",
                                            padding: "10px 12px",
                                            fontSize: "14px",
                                            fontWeight: "500",
                                            border: "2px solid #e0e0e0",
                                            borderRadius: "6px",
                                            backgroundColor: "white",
                                            cursor: "pointer",
                                            color: "#1a1a1a"
                                        },
                                        children: [e.jsx("option", {
                                            value: "pendente",
                                            children: "⏳ Pendente"
                                        }), e.jsx("option", {
                                            value: "pago",
                                            children: "✅ Pago"
                                        }), e.jsx("option", {
                                            value: "processando",
                                            children: "⚙️ Processando"
                                        }), e.jsx("option", {
                                            value: "processando_cartao",
                                            children: "💳 Processando Cartão"
                                        }), e.jsx("option", {
                                            value: "esperando_coleta",
                                            children: "📦 Aguardando Coleta"
                                        }), e.jsx("option", {
                                            value: "em_transporte",
                                            children: "🚚 Em Transporte"
                                        }), e.jsx("option", {
                                            value: "entregue",
                                            children: "🎉 Entregue"
                                        }), e.jsx("option", {
                                            value: "problemas_na_entrega",
                                            children: "⚠️ Problemas na Entrega"
                                        }), e.jsx("option", {
                                            value: "em_devolucao",
                                            children: "↩️ Em Devolução"
                                        }), e.jsx("option", {
                                            value: "em_analise",
                                            children: "🔍 Em Análise"
                                        }), e.jsx("option", {
                                            value: "extornado",
                                            children: "💰 Extornado"
                                        }), e.jsx("option", {
                                            value: "cancelado",
                                            children: "❌ Cancelado"
                                        })]
                                    })]
                                })]
                            })]
                        }, t.id)
                    }
                    )
                }), c > 1 && e.jsxs("div", {
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
                        onClick: () => f(1),
                        disabled: l === 1,
                        style: {
                            padding: "10px 16px",
                            background: l === 1 ? "#f5f5f5" : "#1a1a1a",
                            color: l === 1 ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: l === 1 ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-angles-left"
                        })
                    }), e.jsx("button", {
                        onClick: () => f(t => Math.max(t - 1, 1)),
                        disabled: l === 1,
                        style: {
                            padding: "10px 16px",
                            background: l === 1 ? "#f5f5f5" : "#1a1a1a",
                            color: l === 1 ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: l === 1 ? "not-allowed" : "pointer",
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
                            let n = Math.max(1, l - Math.floor(2.5))
                              , a = Math.min(c, n + 5 - 1);
                            a - n + 1 < 5 && (n = Math.max(1, a - 5 + 1));
                            const s = [];
                            n > 1 && (s.push(e.jsx("button", {
                                onClick: () => f(1),
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
                            n > 2 && s.push(e.jsx("span", {
                                style: {
                                    color: "#999",
                                    padding: "0 4px"
                                },
                                children: "..."
                            }, "ellipsis1")));
                            for (let r = n; r <= a; r++)
                                s.push(e.jsx("button", {
                                    onClick: () => f(r),
                                    style: {
                                        padding: "10px 14px",
                                        background: l === r ? "#1a1a1a" : "white",
                                        color: l === r ? "white" : "#1a1a1a",
                                        border: l === r ? "none" : "1px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s",
                                        minWidth: "40px"
                                    },
                                    children: r
                                }, r));
                            return a < c && (a < c - 1 && s.push(e.jsx("span", {
                                style: {
                                    color: "#999",
                                    padding: "0 4px"
                                },
                                children: "..."
                            }, "ellipsis2")),
                            s.push(e.jsx("button", {
                                onClick: () => f(c),
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
                                children: c
                            }, c))),
                            s
                        }
                        )()
                    }), e.jsx("button", {
                        onClick: () => f(t => Math.min(t + 1, c)),
                        disabled: l === c,
                        style: {
                            padding: "10px 16px",
                            background: l === c ? "#f5f5f5" : "#1a1a1a",
                            color: l === c ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: l === c ? "not-allowed" : "pointer",
                            transition: "all 0.2s"
                        },
                        children: e.jsx("i", {
                            className: "fa-solid fa-chevron-right"
                        })
                    }), e.jsx("button", {
                        onClick: () => f(c),
                        disabled: l === c,
                        style: {
                            padding: "10px 16px",
                            background: l === c ? "#f5f5f5" : "#1a1a1a",
                            color: l === c ? "#999" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: l === c ? "not-allowed" : "pointer",
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
export {ne as default};

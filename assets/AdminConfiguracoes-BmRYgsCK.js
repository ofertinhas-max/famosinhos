import {u as Ie, c as Te, r as t, d as n, j as e, t as le} from "./index-Z_n8MByG.js";
import {A as Ne} from "./AdminSidebar-DpwmTKwH.js";
function We() {
    const f = Ie()
      , {theme: de, changeTheme: pe} = Te()
      , [I,W] = t.useState("")
      , [v,S] = t.useState("")
      , [_,F] = t.useState("")
      , [L,D] = t.useState("")
      , [P,E] = t.useState(!0)
      , [h,$] = t.useState("theme-a")
      , [c,q] = t.useState(!1)
      , [M,V] = t.useState("")
      , [H,J] = t.useState("")
      , [k,T] = t.useState("")
      , [X,N] = t.useState("")
      , [C,G] = t.useState(!1)
      , [ce,xe] = t.useState([])
      , [x,me] = t.useState("geral")
      , [Q,Z] = t.useState("")
      , [K,Y] = t.useState("")
      , [m,ge] = t.useState(!0)
      , [g,ue] = t.useState(!0)
      , [u,fe] = t.useState(!0)
      , [w,ee] = t.useState(!1)
      , [z,oe] = t.useState(!1)
      , [y,ae] = t.useState(null)
      , [te,he] = t.useState(!1)
      , [s,R] = t.useState("nao_exigir")
      , [aa,ba] = t.useState("")
      , [ca,da] = t.useState("")
      , [customModals,setCustomModals] = t.useState([])
      , [customRota,setCustomRota] = t.useState("")
      , [customHtmlCss,setCustomHtmlCss] = t.useState("");
    t.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            f("/painelad", {
                state: {
                    from: "/painelad/configuracoes"
                }
            });
            return
        }
        be(),
        re(),
        refetchCustom()
    }
    , [f]);
    const refetchCustom = async () => {
        try {
            const i = await (await fetch("/api/db/modals/custom", { credentials: "include" })).json();
            if (i && Array.isArray(i)) setCustomModals(i);
        } catch {}
    };
    const re = async () => {
        try {
            const i = await (await fetch("/api/db/modals")).json();
            xe(Array.isArray(i) ? i : (i && i.modals) || [])
        } catch {}
    }
      , ye = async o => {
        try {
            const a = "/api/db"
              , i = localStorage.getItem("form_key")
              , l = await fetch(`${a}/modals/${o}/toggle`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...i && {
                        "X-CSRF-Token": i
                    }
                }
            });
            if (l.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                f("/painelad");
                return
            }
            (await l.json()).success && re()
        } catch {}
    }
      , saveCustomModal = async () => {
        if (!customRota.trim()) return alert("Informe a rota.");
        try {
            const i = localStorage.getItem("form_key")
              , l = await fetch("/api/db/modals/custom", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json", ...i && { "X-CSRF-Token": i } },
                body: JSON.stringify({ rota: customRota.trim(), html_css: customHtmlCss })
            });
            if (l.status === 401) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("app_state");
                localStorage.removeItem("form_key");
                f("/painelad");
                return
            }
            (await l.json()).id && (setCustomRota(""), setCustomHtmlCss(""), refetchCustom())
        } catch {}
    }
      , toggleCustom = async o => {
        try {
            const i = localStorage.getItem("form_key")
              , l = await fetch(`/api/db/modals/custom/${o}/toggle`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json", ...i && { "X-CSRF-Token": i } }
            });
            if (l.status === 401) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("app_state");
                localStorage.removeItem("form_key");
                f("/painelad");
                return
            }
            (await l.json()) && refetchCustom()
        } catch {}
    }
      , deleteCustom = async o => {
        if (!confirm("Excluir este popup?")) return;
        try {
            const i = localStorage.getItem("form_key")
              , l = await fetch(`/api/db/modals/custom/${o}`, {
                method: "DELETE",
                credentials: "include",
                headers: { ...i && { "X-CSRF-Token": i } }
            });
            if (l.status === 401) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("app_state");
                localStorage.removeItem("form_key");
                f("/painelad");
                return
            }
            refetchCustom()
        } catch {}
    }
      , be = async () => {
        try {
            const o = await n.getAllConfiguracoesAdmin();
            W(o.nome_loja || "Carregando..."),
            S(o.logo_loja || ""),
            F(o.vendas_loja || "21"),
            E(o.categorias_ativas === "1"),
            Z(o.api_token || ""),
            Y(o.upload_domain || ""),
            R(o.cpf_obrigatorio || "nao_exigir"),
            ba(o.upload_api_base_url || "");
            const a = o.tema || de.id;
            $(a)
        } catch {}
    }
      , ie = async () => {
        q(!0);
        try {
            await n.saveConfiguracao("nome_loja", I),
            await n.saveConfiguracao("logo_loja", v),
            await n.saveConfiguracao("vendas_loja", _),
            await n.saveConfiguracao("categorias_ativas", P ? "1" : "0"),
            await n.saveConfiguracao("tema", h),
            await n.saveConfiguracao("api_token", Q),
            await n.saveConfiguracao("upload_domain", K),
            await n.saveConfiguracao("upload_api_base_url", aa),
            await n.saveConfiguracao("cpf_obrigatorio", s);
            const o = le[h];
            o && pe(o),
            alert("Configurações salvas com sucesso! O tema foi aplicado.")
        } catch {
            alert("Erro ao salvar configurações")
        } finally {
            q(!1)
        }
    }
      , je = o => {
        const a = o.target.files[0];
        if (!a)
            return;
        if (!a.type.startsWith("image/")) {
            alert("Por favor, selecione apenas arquivos de imagem");
            return
        }
        if (a.size > 2 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 2MB");
            return
        }
        const i = new FileReader;
        i.onloadend = () => {
            S(i.result)
        }
        ,
        i.readAsDataURL(a)
    }
      , ve = () => {
        const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
        let a = "";
        for (let i = 0; i < 20; i++)
            a += o.charAt(Math.floor(Math.random() * o.length));
        T(a),
        N(a)
    }
      , Se = async o => {
        if (o.preventDefault(),
        k !== X) {
            alert("A nova senha e a confirmação não coincidem!");
            return
        }
        if (k.length < 6) {
            alert("A nova senha deve ter pelo menos 6 caracteres!");
            return
        }
        G(!0);
        try {
            const a = await n.alterarSenhaAdmin(H, k);
            a.success ? (alert("Senha alterada com sucesso!"),
            J(""),
            T(""),
            N("")) : alert(a.error || "Erro ao alterar senha")
        } catch {
            alert("Erro ao alterar senha")
        } finally {
            G(!1)
        }
    }
      , ke = async () => {
        if (!m && !g && !u) {
            alert("Selecione pelo menos uma categoria para exportar");
            return
        }
        ee(!0);
        try {
            const o = "/api"
              , a = localStorage.getItem("form_key")
              , i = new URLSearchParams;
            m && i.append("produtos", "true"),
            g && i.append("regras", "true"),
            u && i.append("configuracoes", "true");
            const l = await fetch(`${o}/db/export?${i.toString()}`, {
                credentials: "include",
                headers: {
                    ...a && {
                        "X-CSRF-Token": a
                    }
                }
            });
            if (l.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                f("/painelad");
                return
            }
            if (l.ok) {
                const b = await l.blob()
                  , j = window.URL.createObjectURL(b)
                  , d = document.createElement("a");
                d.href = j;
                const B = (I || "loja").toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
                d.download = `backup-${B}-${new Date().toISOString().split("T")[0]}.json`,
                document.body.appendChild(d),
                d.click(),
                window.URL.revokeObjectURL(j),
                document.body.removeChild(d),
                alert("Dados exportados com sucesso!")
            } else
                throw new Error("Erro ao exportar dados")
        } catch (o) {
            alert("Erro ao exportar dados: " + o.message)
        } finally {
            ee(!1)
        }
    }
      , Ce = o => {
        const a = o.target.files[0];
        if (a) {
            if (a.type !== "application/json") {
                alert("Por favor, selecione um arquivo JSON válido");
                return
            }
            ae(a)
        }
    }
      , we = async () => {
        var o, a, i, l, b, j;
        if (!y) {
            alert("Selecione um arquivo JSON para importar");
            return
        }
        if (confirm(`⚠️ ATENÇÃO:

• Produtos e regras serão ADICIONADOS (duplicados serão criados)
• Configurações serão ATUALIZADAS/SUBSTITUÍDAS

Deseja continuar?`)) {
            oe(!0);
            try {
                const d = await y.text()
                  , B = JSON.parse(d)
                  , Re = "/api"
                  , se = localStorage.getItem("form_key")
                  , ne = await fetch(`${Re}/db/import`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        ...se && {
                            "X-CSRF-Token": se
                        }
                    },
                    body: JSON.stringify({
                        ...B,
                        manterIdsProdutos: te
                    })
                });
                if (ne.status === 401) {
                    localStorage.removeItem("user_id"),
                    localStorage.removeItem("app_state"),
                    localStorage.removeItem("form_key"),
                    f("/painelad");
                    return
                }
                const A = await ne.json();
                if (A.success) {
                    const r = A.resultados;
                    let p = `✅ Importação concluída com sucesso!

`;
                    ((o = r == null ? void 0 : r.produtos) == null ? void 0 : o.total) > 0 && (p += `📦 Produtos: ${r.produtos.sucesso}/${r.produtos.total} importados
`,
                    ((a = r == null ? void 0 : r.categorias) == null ? void 0 : a.criadas) > 0 && (p += `📁 Categorias: ${r.categorias.criadas} criadas
`)),
                    (((i = r == null ? void 0 : r.regras) == null ? void 0 : i.total) > 0 || ((l = r == null ? void 0 : r.regras) == null ? void 0 : l.sucesso) > 0) && (p += `
⚙️ Regras de Venda: ${r.regras.sucesso || 0} importadas
`),
                    (((b = r == null ? void 0 : r.configuracoes) == null ? void 0 : b.total) > 0 || ((j = r == null ? void 0 : r.configuracoes) == null ? void 0 : j.sucesso) > 0) && (p += `
🔧 Configurações: ${r.configuracoes.sucesso || 0} atualizadas
`),
                    p += `
⚠️ IMPORTANTE:
`,
                    p += `• Confira as Regras de Venda (Order Bumps, Atacado, etc)
`,
                    p += `• Revise as Configurações da loja
`,
                    p += "• Verifique se os produtos foram importados corretamente",
                    alert(p),
                    ae(null)
                } else
                    throw new Error(A.error || "Erro ao importar dados")
            } catch (d) {
                alert("Erro ao importar dados: " + d.message)
            } finally {
                oe(!1)
            }
        }
    }
      , ze = [{
        id: "geral",
        nome: "Geral",
        icone: "fa-store"
    }, {
        id: "funcionalidades",
        nome: "Funcionalidades",
        icone: "fa-sliders"
    }, {
        id: "seguranca",
        nome: "Segurança",
        icone: "fa-shield-halved"
    }, {
        id: "exportar-importar",
        nome: "Exportar/Importar",
        icone: "fa-arrow-right-arrow-left"
    }];
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(Ne, {}), e.jsxs("div", {
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
                children: "Configurações"
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
                children: ze.map(o => e.jsxs("button", {
                    onClick: () => me(o.id),
                    style: {
                        flex: 1,
                        padding: "12px 16px",
                        background: x === o.id ? "#1a1a1a" : "transparent",
                        color: x === o.id ? "white" : "#666",
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
                        className: `fa-solid ${o.icone}`
                    }), o.nome]
                }, o.id))
            }), x === "geral" && e.jsxs("div", {
                className: "admin-card",
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Informações da Loja"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "24px",
                        marginBottom: "24px"
                    },
                    children: [e.jsxs("div", {
                        className: "admin-form-group",
                        style: {
                            marginBottom: "0"
                        },
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Nome da Loja"
                        }), e.jsx("input", {
                            type: "text",
                            value: I,
                            onChange: o => W(o.target.value),
                            placeholder: "Digite o nome da sua loja",
                            className: "admin-form-input",
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
                            children: "Este nome aparecerá no cabeçalho da loja e em outras áreas"
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-group",
                        style: {
                            marginBottom: "0"
                        },
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Vendas da Loja"
                        }), e.jsx("input", {
                            type: "number",
                            value: _,
                            onChange: o => F(o.target.value),
                            placeholder: "Digite o número de vendas",
                            className: "admin-form-input",
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            },
                            min: "0"
                        }), e.jsx("small", {
                            style: {
                                color: "#666",
                                fontSize: "12px",
                                marginTop: "4px",
                                display: "block"
                            },
                            children: 'Este número aparecerá como "X vendido(s)" na página inicial da loja'
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "admin-form-group",
                    style: {
                        marginBottom: "24px"
                    },
                    children: [e.jsx("label", {
                        className: "admin-form-label",
                        style: {
                            display: "block",
                            fontSize: "14px",
                            fontWeight: "600",
                            marginBottom: "8px",
                            color: "#333"
                        },
                        children: "Logo da Loja"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginBottom: "12px"
                        },
                        children: [e.jsx("input", {
                            type: "text",
                            value: v,
                            onChange: o => S(o.target.value),
                            placeholder: "Cole a URL da logo ou faça upload",
                            className: "admin-form-input",
                            style: {
                                flex: 1,
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px"
                            }
                        }), e.jsxs("label", {
                            style: {
                                padding: "12px 20px",
                                background: "#4CAF50",
                                color: "white",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "600",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                whiteSpace: "nowrap",
                                border: "none"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-upload"
                            }), "Upload", e.jsx("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: je,
                                style: {
                                    display: "none"
                                }
                            })]
                        })]
                    }), e.jsx("small", {
                        style: {
                            color: "#666",
                            fontSize: "12px",
                            display: "block",
                            marginBottom: "8px"
                        },
                        children: "Faça upload de uma imagem ou cole a URL. Esta imagem aparecerá no cabeçalho da loja e no chat."
                    }), v && e.jsxs("div", {
                        style: {
                            marginTop: "12px",
                            padding: "12px",
                            background: "#f9f9f9",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                            },
                            children: [e.jsx("img", {
                                src: v,
                                alt: "Preview da logo",
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "2px solid #ddd"
                                },
                                onError: o => {
                                    o.target.style.display = "none"
                                }
                            }), e.jsx("span", {
                                style: {
                                    fontSize: "13px",
                                    color: "#666"
                                },
                                children: "Preview da logo"
                            })]
                        }), e.jsx("button", {
                            type: "button",
                            onClick: () => S(""),
                            style: {
                                padding: "8px 16px",
                                background: "#f44336",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "13px",
                                cursor: "pointer",
                                fontWeight: "600"
                            },
                            children: "Remover"
                        })]
                    })]
                }), e.jsxs("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px"
                    },
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            color: "#1a1a1a"
                        },
                        children: "Aparência da Loja"
                    }), e.jsxs("div", {
                        className: "admin-form-group",
                        style: {
                            marginBottom: "24px"
                        },
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "12px",
                                color: "#333"
                            },
                            children: "Tema de Cores"
                        }), e.jsx("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                gap: "12px",
                                marginBottom: "8px"
                            },
                            children: Object.entries(le).map( ([o,a]) => e.jsxs("div", {
                                onClick: () => $(o),
                                style: {
                                    padding: "16px",
                                    border: h === o ? `3px solid ${a.colors.primary}` : "2px solid #e0e0e0",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    background: h === o ? a.colors.backgroundSoft : "white",
                                    position: "relative"
                                },
                                children: [h === o && e.jsx("div", {
                                    style: {
                                        position: "absolute",
                                        top: "8px",
                                        right: "8px",
                                        background: a.colors.primary,
                                        color: "white",
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "12px"
                                    },
                                    children: "✓"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        marginBottom: "12px",
                                        color: "#1a1a1a"
                                    },
                                    children: a.name
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        gap: "6px",
                                        marginTop: "8px"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            flex: 1,
                                            height: "24px",
                                            background: a.colors.primary,
                                            borderRadius: "4px"
                                        },
                                        title: "Cor Primária"
                                    }), e.jsx("div", {
                                        style: {
                                            flex: 1,
                                            height: "24px",
                                            background: a.colors.secondary,
                                            borderRadius: "4px"
                                        },
                                        title: "Cor Secundária"
                                    }), e.jsx("div", {
                                        style: {
                                            flex: 1,
                                            height: "24px",
                                            background: a.colors.accent,
                                            borderRadius: "4px"
                                        },
                                        title: "Cor de Destaque"
                                    })]
                                })]
                            }, o))
                        }), e.jsx("small", {
                            style: {
                                color: "#666",
                                fontSize: "12px",
                                marginTop: "4px",
                                display: "block"
                            },
                            children: "Escolha as cores principais da sua loja. As mudanças serão aplicadas após salvar."
                        })]
                    }), e.jsxs("div", {
                        style: {
                            borderTop: "1px solid #eee",
                            paddingTop: "24px",
                            marginTop: "32px",
                            marginBottom: "24px"
                        },
                        children: [e.jsx("h3", {
                            style: {
                                fontSize: "18px",
                                fontWeight: "600",
                                marginBottom: "16px",
                                color: "#1a1a1a"
                            },
                            children: "Modais & Pop-ups"
                        }), e.jsx("p", {
                            style: {
                                fontSize: "14px",
                                color: "#666",
                                marginBottom: "20px"
                            },
                            children: "Gerencie os modais e pop-ups exibidos na loja"
                        }), e.jsx("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px"
                            },
                            children: ce.map(o => e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "16px",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    background: "white"
                                },
                                children: [e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "15px",
                                            fontWeight: "600",
                                            color: "#1a1a1a",
                                            marginBottom: "4px"
                                        },
                                        children: o.nome
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#666"
                                        },
                                        children: ["Tipo: ", o.tipo]
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px"
                                    },
                                    children: [e.jsx("span", {
                                        style: {
                                            padding: "4px 12px",
                                            borderRadius: "12px",
                                            fontSize: "12px",
                                            fontWeight: "600",
                                            background: o.ativo ? "#d4edda" : "#f8d7da",
                                            color: o.ativo ? "#155724" : "#721c24"
                                        },
                                        children: o.ativo ? "Ativo" : "Inativo"
                                    }), e.jsx("button", {
                                        onClick: () => ye(o.id),
                                        style: {
                                            padding: "8px 16px",
                                            borderRadius: "6px",
                                            border: "none",
                                            background: o.ativo ? "#dc3545" : "#28a745",
                                            color: "white",
                                            fontSize: "13px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all 0.2s"
                                        },
                                        onMouseOver: a => a.target.style.opacity = "0.8",
                                        onMouseOut: a => a.target.style.opacity = "1",
                                        children: o.ativo ? "Desativar" : "Ativar"
                                    })]
                                })]
                            }, o.id))
                        })]
                    }), e.jsxs("div", {
                        style: { borderTop: "1px solid #eee", paddingTop: "24px", marginTop: "32px", marginBottom: "24px" },
                        children: [
                            e.jsx("h3", { children: "Adicionar popup customizado" }),
                            e.jsx("label", { style: { display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#333" }, children: "Rota (ex: / ou /produtos)" }),
                            e.jsx("input", { type: "text", value: customRota, onChange: o => setCustomRota(o.target.value), placeholder: "/", className: "admin-form-input", style: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", marginBottom: "12px" } }),
                            e.jsx("label", { style: { display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#333" }, children: "HTML + CSS" }),
                            e.jsx("textarea", { value: customHtmlCss, onChange: o => setCustomHtmlCss(o.target.value), placeholder: "<div>...</div>", className: "admin-form-input", style: { width: "100%", minHeight: "120px", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "monospace", marginBottom: "12px" } }),
                            e.jsx("button", { type: "button", onClick: saveCustomModal, style: { padding: "10px 20px", background: "#2196F3", color: "white", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }, children: "Salvar popup" }),
                            customModals.length > 0 && e.jsx("div", { style: { marginTop: "20px" }, children: e.jsx("div", { style: { fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#333" }, children: "Popups customizados" }) }),
                            customModals.length > 0 && customModals.map(o => e.jsxs("div", { key: o.id, style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "white", marginTop: "8px" }, children: [e.jsx("div", { style: { fontSize: "14px", fontWeight: "600", color: "#1a1a1a" }, children: o.rota || "(rota)" }), e.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [e.jsx("span", { style: { padding: "4px 10px", borderRadius: "12px", fontSize: "12px", background: o.ativo ? "#d4edda" : "#f8d7da", color: o.ativo ? "#155724" : "#721c24" }, children: o.ativo ? "Ativo" : "Inativo" }), e.jsx("button", { type: "button", onClick: () => toggleCustom(o.id), style: { padding: "6px 12px", borderRadius: "6px", border: "none", background: o.ativo ? "#dc3545" : "#28a745", color: "white", fontSize: "12px", cursor: "pointer" }, children: o.ativo ? "Desativar" : "Ativar" }), e.jsx("button", { type: "button", onClick: () => deleteCustom(o.id), style: { padding: "6px 12px", borderRadius: "6px", border: "none", background: "#6c757d", color: "white", fontSize: "12px", cursor: "pointer" }, children: "Excluir" }) ] }) ] })),
                        ]
                    }), e.jsxs("div", {
                        style: {
                            borderTop: "1px solid #eee",
                            paddingTop: "24px",
                            marginTop: "32px",
                            marginBottom: "24px"
                        },
                        children: [e.jsx("h3", {
                            style: {
                                fontSize: "18px",
                                fontWeight: "600",
                                marginBottom: "16px",
                                color: "#1a1a1a"
                            },
                            children: "Funcionalidades",
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            style: {
                                marginBottom: "24px"
                            },
                            children: [e.jsx("label", {
                                style: {
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#333",
                                    display: "block",
                                    marginBottom: "12px"
                                },
                                children: "Comportamento do CPF no /checkout"
                            }), e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    gap: "12px",
                                    flexWrap: "wrap"
                                },
                                children: [e.jsx("button", {
                                    type: "button",
                                    onClick: () => R("exigir"),
                                    style: {
                                        padding: "10px 20px",
                                        background: s === "exigir" ? "#2196F3" : "#f5f5f5",
                                        color: s === "exigir" ? "white" : "#666",
                                        border: s === "exigir" ? "2px solid #2196F3" : "2px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    },
                                    children: "Exigir CPF"
                                }), e.jsx("button", {
                                    type: "button",
                                    onClick: () => R("nao_exigir"),
                                    style: {
                                        padding: "10px 20px",
                                        background: s === "nao_exigir" ? "#2196F3" : "#f5f5f5",
                                        color: s === "nao_exigir" ? "white" : "#666",
                                        border: s === "nao_exigir" ? "2px solid #2196F3" : "2px solid #ddd",
                                        borderRadius: "6px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    },
                                    children: "Não exigir"
                                })]
                            }), e.jsxs("small", {
                                style: {
                                    color: "#666",
                                    fontSize: "12px",
                                    marginTop: "8px",
                                    display: "block"
                                },
                                children: [s === "exigir" && "O campo CPF será obrigatório no checkout", s === "nao_exigir" && "O campo CPF não será exibido no checkout"]
                            })]
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px"
                                },
                                children: [e.jsx("input", {
                                    type: "checkbox",
                                    id: "categorias_ativas",
                                    checked: P,
                                    onChange: o => E(o.target.checked),
                                    className: "admin-form-checkbox",
                                    style: {
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer"
                                    }
                                }), e.jsx("label", {
                                    htmlFor: "categorias_ativas",
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        color: "#333"
                                    },
                                    children: "Ativar sistema de categorias"
                                })]
                            }), e.jsx("small", {
                                style: {
                                    color: "#666",
                                    fontSize: "12px",
                                    marginTop: "8px",
                                    marginLeft: "32px",
                                    display: "block"
                                },
                                children: "Quando ativado, os produtos poderão ser organizados por categorias na loja"
                            })]
                        })]
                    })]
                }), e.jsx("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px"
                    },
                    children: e.jsx("button", {
                        onClick: ie,
                        disabled: c,
                        className: "admin-btn admin-btn-primary",
                        style: {
                            padding: "14px 32px",
                            background: c ? "#999" : "#1a1a1a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: c ? "not-allowed" : "pointer"
                        },
                        children: c ? "Salvando..." : "Salvar Configurações"
                    })
                })]
            }), x === "funcionalidades" && e.jsxs("div", {
                className: "admin-card",
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Integração PIX"
                }), e.jsxs("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px",
                        marginBottom: "24px"
                    },
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            color: "#1a1a1a"
                        },
                        children: "Token da API (EscalaPay)"
                    }), e.jsx("input", {
                        type: "text",
                        value: Q,
                        onChange: o => Z(o.target.value),
                        placeholder: "ik_live_...",
                        className: "admin-form-input",
                        style: {
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "monospace"
                        }
                    }), e.jsx("small", {
                        style: {
                            color: "#666",
                            fontSize: "12px",
                            marginTop: "8px",
                            display: "block"
                        },
                        children: "Token da API EscalaPay (ESCALAPAY_API_KEY). Alterar aqui atualiza o .env do servidor."
                    })]
                }), e.jsxs("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px",
                        marginBottom: "24px"
                    },
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            color: "#1a1a1a"
                        },
                        children: "Domínio de Upload de Imagens"
                    }), e.jsx("input", {
                        type: "text",
                        value: K,
                        onChange: o => Y(o.target.value),
                        placeholder: "http://76.13.225.70:3002",
                        className: "admin-form-input",
                        style: {
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "monospace"
                        }
                    }), e.jsx("small", {
                        style: {
                            color: "#666",
                            fontSize: "12px",
                            marginTop: "8px",
                            display: "block"
                        },
                        children: "Domínio base (SITE_URL do .env). Endpoint: /api-receiver.php. Alterar aqui atualiza UPLOAD_DOMAIN."
                    })]
                }), e.jsxs("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px",
                        marginBottom: "24px"
                    },
                    children: [e.jsx("h2", {
                        style: { fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "#1a1a1a" },
                        children: "Base URL da API de upload"
                    }), e.jsx("input", {
                        type: "text",
                        value: aa,
                        onChange: o => ba(o.target.value),
                        placeholder: "http://76.13.225.70:3002",
                        className: "admin-form-input",
                        style: { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", fontFamily: "monospace" }
                    }), e.jsx("small", {
                        style: { color: "#666", fontSize: "12px", marginTop: "8px", display: "block" },
                        children: "Mesmo que o domínio acima (SITE_URL do .env). Alterar aqui atualiza UPLOAD_API_BASE_URL."
                    })]
                }), e.jsx("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        paddingTop: "24px",
                        marginTop: "32px"
                    },
                    children: e.jsx("button", {
                        onClick: ie,
                        disabled: c,
                        className: "admin-btn admin-btn-primary",
                        style: {
                            padding: "14px 32px",
                            background: c ? "#999" : "#1a1a1a",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: c ? "not-allowed" : "pointer"
                        },
                        children: c ? "Salvando..." : "Salvar Configurações"
                    })
                })]
            }), x === "seguranca" && e.jsxs("div", {
                className: "admin-card",
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Alterar Senha"
                }), e.jsxs("form", {
                    onSubmit: Se,
                    children: [e.jsxs("div", {
                        className: "admin-form-group",
                        style: {
                            marginBottom: "16px"
                        },
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#333"
                            },
                            children: "Senha Atual"
                        }), e.jsx("input", {
                            type: "password",
                            value: H,
                            onChange: o => J(o.target.value),
                            placeholder: "Digite a senha atual",
                            className: "admin-form-input",
                            style: {
                                width: "100%",
                                padding: "12px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontFamily: "monospace"
                            },
                            required: !0
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "16px",
                            marginBottom: "16px"
                        },
                        children: [e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: "#333"
                                },
                                children: "Nova Senha"
                            }), e.jsx("input", {
                                type: "password",
                                value: k,
                                onChange: o => T(o.target.value),
                                placeholder: "Mínimo 6 caracteres",
                                className: "admin-form-input",
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontFamily: "monospace"
                                },
                                required: !0,
                                minLength: 6
                            })]
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                style: {
                                    display: "block",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: "#333"
                                },
                                children: "Confirmar Nova Senha"
                            }), e.jsx("input", {
                                type: "password",
                                value: X,
                                onChange: o => N(o.target.value),
                                placeholder: "Digite novamente",
                                className: "admin-form-input",
                                style: {
                                    width: "100%",
                                    padding: "12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontFamily: "monospace"
                                },
                                required: !0,
                                minLength: 6
                            })]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center"
                        },
                        children: [e.jsx("button", {
                            type: "submit",
                            disabled: C,
                            className: "admin-btn",
                            style: {
                                padding: "12px 24px",
                                background: C ? "#999" : "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "bold",
                                cursor: C ? "not-allowed" : "pointer"
                            },
                            children: C ? "Alterando..." : "Alterar Senha"
                        }), e.jsxs("button", {
                            type: "button",
                            onClick: ve,
                            title: "Gerar senha aleatória de 20 caracteres",
                            style: {
                                padding: "12px 20px",
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontWeight: "bold"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-shuffle"
                            }), "Gerar senha aleatória"]
                        })]
                    }), e.jsx("small", {
                        style: {
                            color: "#666",
                            fontSize: "12px",
                            marginTop: "12px",
                            display: "block"
                        },
                        children: "⚠️ Após alterar a senha, você precisará fazer login novamente"
                    })]
                })]
            }), x === "exportar-importar" && e.jsxs("div", {
                className: "admin-card",
                children: [e.jsx("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "24px",
                        color: "#1a1a1a"
                    },
                    children: "Exportar/Importar Dados"
                }), e.jsxs("div", {
                    style: {
                        marginBottom: "40px"
                    },
                    children: [e.jsx("h3", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "16px",
                            color: "#1a1a1a"
                        },
                        children: "Exportar Dados"
                    }), e.jsx("p", {
                        style: {
                            fontSize: "14px",
                            color: "#666",
                            marginBottom: "20px"
                        },
                        children: "Selecione os dados que deseja exportar"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            marginBottom: "20px"
                        },
                        children: [e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "checkbox",
                                checked: m,
                                onChange: o => ge(o.target.checked),
                                style: {
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }
                            }), e.jsxs("div", {
                                style: {
                                    flex: 1
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Produtos, Categorias e Avaliações"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666"
                                    },
                                    children: "Todos os produtos com suas categorias, imagens, variações e avaliações"
                                })]
                            })]
                        }), e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "checkbox",
                                checked: g,
                                onChange: o => ue(o.target.checked),
                                style: {
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }
                            }), e.jsxs("div", {
                                style: {
                                    flex: 1
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Regras de Venda"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666"
                                    },
                                    children: "Order Bumps, Vendas em Atacado, Brindes, Frete e Upsells"
                                })]
                            })]
                        }), e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "8px",
                                cursor: "pointer"
                            },
                            children: [e.jsx("input", {
                                type: "checkbox",
                                checked: u,
                                onChange: o => fe(o.target.checked),
                                style: {
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }
                            }), e.jsxs("div", {
                                style: {
                                    flex: 1
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Configurações"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666"
                                    },
                                    children: "Configurações da loja, tema, integrações e funcionalidades"
                                })]
                            })]
                        })]
                    }), e.jsxs("button", {
                        onClick: ke,
                        disabled: w || !m && !g && !u,
                        style: {
                            padding: "14px 32px",
                            background: w || !m && !g && !u ? "#ccc" : "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: w || !m && !g && !u ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-download"
                        }), w ? "Exportando..." : "Exportar Selecionados"]
                    })]
                }), e.jsx("div", {
                    style: {
                        borderTop: "1px solid #eee",
                        marginBottom: "40px"
                    }
                }), e.jsxs("div", {
                    children: [e.jsx("h3", {
                        style: {
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "16px",
                            color: "#1a1a1a"
                        },
                        children: "Importar Dados"
                    }), e.jsx("p", {
                        style: {
                            fontSize: "14px",
                            color: "#666",
                            marginBottom: "20px"
                        },
                        children: "Faça upload de um arquivo JSON exportado anteriormente"
                    }), e.jsxs("div", {
                        style: {
                            background: "#f8f9fa",
                            border: "2px dashed #ddd",
                            padding: "40px",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "16px"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-cloud-arrow-up",
                            style: {
                                fontSize: "48px",
                                color: "#999",
                                marginBottom: "16px"
                            }
                        }), e.jsx("div", {
                            style: {
                                marginBottom: "16px"
                            },
                            children: e.jsxs("label", {
                                style: {
                                    padding: "12px 24px",
                                    background: "#4CAF50",
                                    color: "white",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    display: "inline-block"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-file-arrow-up"
                                }), " Selecionar arquivo JSON", e.jsx("input", {
                                    type: "file",
                                    accept: ".json",
                                    onChange: Ce,
                                    style: {
                                        display: "none"
                                    }
                                })]
                            })
                        }), y && e.jsxs("div", {
                            style: {
                                fontSize: "14px",
                                color: "#4CAF50",
                                fontWeight: "600",
                                marginBottom: "8px"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-check-circle"
                            }), " ", y.name]
                        }), e.jsx("div", {
                            style: {
                                fontSize: "13px",
                                color: "#999"
                            },
                            children: "Apenas arquivos .json são aceitos"
                        })]
                    }), y && e.jsxs(e.Fragment, {
                        children: [e.jsxs("label", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px",
                                background: "#fff3e0",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginBottom: "16px",
                                border: "1px solid #FFB74D"
                            },
                            children: [e.jsx("input", {
                                type: "checkbox",
                                checked: te,
                                onChange: o => he(o.target.checked),
                                style: {
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer"
                                }
                            }), e.jsxs("div", {
                                style: {
                                    flex: 1
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#1a1a1a"
                                    },
                                    children: "Substituir produtos existentes (manter IDs)"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#666"
                                    },
                                    children: ["Se marcado: mantém IDs originais e substitui produtos existentes.", e.jsx("br", {}), "Se desmarcado: cria novos produtos com IDs automáticos."]
                                })]
                            })]
                        }), e.jsxs("button", {
                            onClick: we,
                            disabled: z,
                            style: {
                                padding: "14px 32px",
                                background: z ? "#ccc" : "#1a1a1a",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: z ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginBottom: "16px"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-upload"
                            }), z ? "Importando..." : "Importar Dados"]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            fontSize: "13px",
                            color: "#666",
                            background: "#fff3e0",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #FFB74D",
                            marginBottom: "12px"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-triangle-exclamation",
                            style: {
                                color: "#FF9800",
                                marginRight: "8px"
                            }
                        }), e.jsx("strong", {
                            children: "Atenção:"
                        }), " Produtos e regras serão adicionados ao banco (duplicados serão criados). Configurações serão atualizadas/substituídas."]
                    }), e.jsxs("div", {
                        style: {
                            fontSize: "13px",
                            color: "#1976D2",
                            background: "#E3F2FD",
                            padding: "12px",
                            borderRadius: "6px",
                            border: "1px solid #64B5F6"
                        },
                        children: [e.jsx("i", {
                            className: "fa-solid fa-circle-info",
                            style: {
                                color: "#1976D2",
                                marginRight: "8px"
                            }
                        }), e.jsx("strong", {
                            children: "Após importar:"
                        }), " Confira as Regras de Venda, Configurações da loja e verifique se os produtos foram importados corretamente."]
                    })]
                })]
            })]
        })]
    })
}
export {We as default};

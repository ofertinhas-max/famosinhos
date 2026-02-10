import {r as c, j as e, d as N, u as Se, b as we, L as ee} from "./index-Z_n8MByG.js";
import {A as ze} from "./AdminSidebar-DpwmTKwH.js";
function Ie({value: C, onChange: h, placeholder: I="Digite sua descrição aqui..."}) {
    const a = c.useRef(null)
      , [b,l] = c.useState(!1)
      , [j,L] = c.useState("")
      , [D,p] = c.useState(!1)
      , [S,y] = c.useState("")
      , [A,T] = c.useState("")
      , [x,P] = c.useState(!1)
      , $ = c.useRef(null)
      , w = c.useRef(null);
    c.useEffect( () => {
        !x && a.current ? a.current.innerHTML !== C && (a.current.innerHTML = C || "") : x && w.current && w.current.value !== C && (w.current.value = C || "")
    }
    , [C, x]),
    c.useEffect( () => {
        b && $.current && setTimeout( () => {
            var r;
            (r = $.current) == null || r.focus()
        }
        , 100)
    }
    , [b]),
    c.useEffect( () => {
        x && w.current && setTimeout( () => {
            var r;
            (r = w.current) == null || r.focus()
        }
        , 100)
    }
    , [x]);
    const O = () => {
        a.current && h(a.current.innerHTML)
    }
      , z = (r, u=null) => {
        var d;
        document.execCommand(r, !1, u),
        (d = a.current) == null || d.focus(),
        O()
    }
      , M = () => {
        if (!j.trim()) {
            alert("Por favor, insira uma URL válida");
            return
        }
        a.current && a.current.focus();
        const r = window.getSelection();
        let u;
        r.rangeCount > 0 ? u = r.getRangeAt(0) : (u = document.createRange(),
        a.current && (u.selectNodeContents(a.current),
        u.collapse(!1)));
        const d = document.createElement("img");
        d.src = j.trim(),
        d.style.maxWidth = "100%",
        d.style.height = "auto",
        d.style.display = "block",
        d.style.margin = "8px 0",
        d.alt = "Imagem do produto",
        d.onerror = function() {
            alert("Erro ao carregar a imagem. Verifique se a URL está correta."),
            this.style.display = "none"
        }
        ;
        try {
            u.deleteContents(),
            u.insertNode(d),
            u.setStartAfter(d),
            u.collapse(!0),
            r.removeAllRanges(),
            r.addRange(u),
            a.current && h(a.current.innerHTML),
            L(""),
            l(!1)
        } catch {
            if (a.current) {
                const k = document.createElement("br");
                a.current.appendChild(k),
                a.current.appendChild(d),
                a.current && h(a.current.innerHTML),
                L(""),
                l(!1)
            } else
                alert("Erro ao inserir imagem. Tente novamente.")
        }
    }
      , J = () => {
        if (S.trim()) {
            const r = window.getSelection();
            let u = A.trim() || S;
            if (r.rangeCount > 0 && r.toString().trim()) {
                const d = r.getRangeAt(0)
                  , f = document.createElement("a");
                f.href = S,
                f.target = "_blank",
                f.rel = "noopener noreferrer";
                try {
                    d.surroundContents(f)
                } catch {
                    f.textContent = r.toString(),
                    d.deleteContents(),
                    d.insertNode(f)
                }
                O()
            } else {
                const d = document.createElement("a");
                if (d.href = S,
                d.textContent = u,
                d.target = "_blank",
                d.rel = "noopener noreferrer",
                a.current) {
                    const f = document.createRange()
                      , k = window.getSelection();
                    f.selectNodeContents(a.current),
                    f.collapse(!1),
                    k.removeAllRanges(),
                    k.addRange(f),
                    f.insertNode(d),
                    O()
                }
            }
            y(""),
            T(""),
            p(!1)
        }
    }
      , v = ({onClick: r, icon: u, title: d, active: f=!1, disabled: k=!1}) => e.jsx("button", {
        type: "button",
        onClick: r,
        title: d,
        disabled: k,
        style: {
            padding: "6px 10px",
            border: "1px solid #dee2e6",
            background: f ? "#007bff" : k ? "#f5f5f5" : "#fff",
            color: f ? "#fff" : k ? "#999" : "#333",
            borderRadius: "4px",
            cursor: k ? "not-allowed" : "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transition: "all 0.2s",
            opacity: k ? .5 : 1
        },
        onMouseEnter: W => {
            !f && !k && (W.target.style.background = "#f8f9fa")
        }
        ,
        onMouseLeave: W => {
            !f && !k && (W.target.style.background = "#fff")
        }
        ,
        children: u
    });
    return e.jsxs("div", {
        style: {
            border: "1px solid #dee2e6",
            borderRadius: "6px",
            overflow: "hidden"
        },
        children: [e.jsxs("div", {
            style: {
                background: "#f8f9fa",
                padding: "8px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                alignItems: "center"
            },
            children: [e.jsx(v, {
                onClick: () => z("bold"),
                icon: e.jsx("span", {
                    style: {
                        fontWeight: "bold"
                    },
                    children: "B"
                }),
                title: "Negrito (Ctrl+B)",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => z("italic"),
                icon: e.jsx("span", {
                    style: {
                        fontStyle: "italic"
                    },
                    children: "I"
                }),
                title: "Itálico (Ctrl+I)",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => z("underline"),
                icon: e.jsx("span", {
                    style: {
                        textDecoration: "underline"
                    },
                    children: "U"
                }),
                title: "Sublinhado (Ctrl+U)",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => z("insertUnorderedList"),
                icon: "• Lista",
                title: "Lista não ordenada",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => z("insertOrderedList"),
                icon: "1. Lista",
                title: "Lista numerada",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => z("justifyLeft"),
                icon: "⬅",
                title: "Alinhar à esquerda",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => z("justifyCenter"),
                icon: "⬌",
                title: "Centralizar",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => z("justifyRight"),
                icon: "➡",
                title: "Alinhar à direita",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => {
                    const r = prompt("Digite a cor (ex: #ff0000 ou red):", "#000000");
                    r && z("foreColor", r)
                }
                ,
                icon: "🎨",
                title: "Cor do texto",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => {
                    const r = prompt("Digite a cor de fundo (ex: #ffff00 ou yellow):", "#ffffff");
                    r && z("backColor", r)
                }
                ,
                icon: "🖍️",
                title: "Cor de fundo",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsxs("select", {
                onChange: r => {
                    r.target.value && (z("fontSize", r.target.value),
                    r.target.value = "")
                }
                ,
                disabled: x,
                style: {
                    padding: "6px 8px",
                    border: "1px solid #dee2e6",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: x ? "not-allowed" : "pointer",
                    opacity: x ? .5 : 1
                },
                title: "Tamanho da fonte",
                children: [e.jsx("option", {
                    value: "",
                    children: "Tamanho"
                }), e.jsx("option", {
                    value: "1",
                    children: "Muito pequeno"
                }), e.jsx("option", {
                    value: "2",
                    children: "Pequeno"
                }), e.jsx("option", {
                    value: "3",
                    children: "Normal"
                }), e.jsx("option", {
                    value: "4",
                    children: "Médio"
                }), e.jsx("option", {
                    value: "5",
                    children: "Grande"
                }), e.jsx("option", {
                    value: "6",
                    children: "Muito grande"
                }), e.jsx("option", {
                    value: "7",
                    children: "Extra grande"
                })]
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => l(!0),
                icon: "🖼️",
                title: "Inserir imagem",
                active: !1,
                disabled: x
            }), e.jsx(v, {
                onClick: () => {
                    const r = window.getSelection().toString();
                    T(r || ""),
                    p(!0)
                }
                ,
                icon: "🔗",
                title: "Inserir link",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => z("removeFormat"),
                icon: "🧹",
                title: "Remover formatação",
                active: !1,
                disabled: x
            }), e.jsx("div", {
                style: {
                    width: "1px",
                    height: "20px",
                    background: "#dee2e6",
                    margin: "0 4px"
                }
            }), e.jsx(v, {
                onClick: () => {
                    if (x) {
                        if (w.current && a.current) {
                            const r = w.current.value || "";
                            a.current.innerHTML = r,
                            h(r)
                        }
                    } else
                        a.current && w.current && (w.current.value = a.current.innerHTML || "");
                    P(!x)
                }
                ,
                icon: x ? "👁️ Visual" : "</> HTML",
                title: x ? "Alternar para Modo Visual" : "Alternar para Modo HTML",
                active: x
            })]
        }), x ? e.jsxs("div", {
            style: {
                position: "relative"
            },
            children: [e.jsxs("div", {
                style: {
                    padding: "8px 12px",
                    background: "#f8f9fa",
                    borderBottom: "1px solid #dee2e6",
                    fontSize: "12px",
                    color: "#666",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                },
                children: [e.jsx("span", {
                    style: {
                        fontWeight: "600"
                    },
                    children: "📝 Modo HTML"
                }), e.jsx("span", {
                    style: {
                        fontSize: "11px"
                    },
                    children: "Edite o código HTML diretamente"
                })]
            }), e.jsx("textarea", {
                ref: w,
                value: C || "",
                onChange: r => {
                    h(r.target.value)
                }
                ,
                placeholder: "Digite ou cole o código HTML aqui...",
                style: {
                    minHeight: "200px",
                    maxHeight: "400px",
                    padding: "12px",
                    overflowY: "auto",
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "#333",
                    fontFamily: 'monospace, "Courier New", Courier',
                    outline: "none",
                    background: "#ffffff",
                    border: "none",
                    width: "100%",
                    resize: "vertical",
                    boxSizing: "border-box"
                }
            })]
        }) : e.jsx("div", {
            ref: a,
            contentEditable: !0,
            onInput: O,
            onKeyDown: r => {
                r.key === "Enter" && !r.shiftKey && document.execCommand("formatBlock", !1, "<p>")
            }
            ,
            onPaste: r => {
                r.preventDefault();
                const u = r.clipboardData.getData("text/plain")
                  , d = r.clipboardData.getData("text/html");
                if (d) {
                    const f = document.createElement("div");
                    f.innerHTML = d;
                    const k = f.textContent || f.innerText || "";
                    document.execCommand("insertText", !1, k)
                } else
                    document.execCommand("insertText", !1, u)
            }
            ,
            style: {
                minHeight: "200px",
                maxHeight: "400px",
                padding: "12px",
                overflowY: "auto",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#333",
                fontFamily: "system-ui, -apple-system, sans-serif",
                outline: "none",
                background: "#ffffff"
            },
            "data-placeholder": I,
            suppressContentEditableWarning: !0
        }), e.jsx("style", {
            children: `
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #999;
          font-style: italic;
        }
      `
        }), b && e.jsx("div", {
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
                zIndex: 1e3
            },
            onClick: () => l(!1),
            children: e.jsxs("div", {
                onClick: r => r.stopPropagation(),
                style: {
                    background: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    width: "90%",
                    maxWidth: "400px"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "16px",
                        fontSize: "16px",
                        fontWeight: "600"
                    },
                    children: "Inserir Imagem"
                }), e.jsx("input", {
                    ref: $,
                    type: "text",
                    value: j,
                    onChange: r => L(r.target.value),
                    placeholder: "Cole a URL da imagem (ex: https://exemplo.com/imagem.jpg)",
                    style: {
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        marginBottom: "12px",
                        fontSize: "14px",
                        boxSizing: "border-box"
                    },
                    onKeyPress: r => {
                        r.key === "Enter" && j.trim() && (r.preventDefault(),
                        M())
                    }
                }), j && e.jsxs("div", {
                    style: {
                        marginBottom: "12px",
                        textAlign: "center"
                    },
                    children: [e.jsx("p", {
                        style: {
                            fontSize: "12px",
                            color: "#666",
                            marginBottom: "8px"
                        },
                        children: "Preview:"
                    }), e.jsx("img", {
                        src: j,
                        alt: "Preview",
                        style: {
                            maxWidth: "100%",
                            maxHeight: "200px",
                            border: "1px solid #dee2e6",
                            borderRadius: "4px",
                            display: "block",
                            margin: "0 auto"
                        },
                        onError: r => {
                            r.target.style.display = "none";
                            const u = r.target.nextSibling;
                            if (!u || u.className !== "image-error") {
                                const d = document.createElement("div");
                                d.className = "image-error",
                                d.style.cssText = "color: #dc3545; font-size: 12px; margin-top: 8px;",
                                d.textContent = "⚠️ Não foi possível carregar a imagem. Verifique a URL.",
                                r.target.parentNode.appendChild(d)
                            }
                        }
                        ,
                        onLoad: r => {
                            const u = r.target.parentNode.querySelector(".image-error");
                            u && u.remove()
                        }
                    })]
                }), e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end"
                    },
                    children: [e.jsx("button", {
                        type: "button",
                        onClick: () => {
                            l(!1),
                            L("")
                        }
                        ,
                        style: {
                            padding: "8px 16px",
                            background: "#f5f5f5",
                            border: "1px solid #dee2e6",
                            borderRadius: "4px",
                            cursor: "pointer"
                        },
                        children: "Cancelar"
                    }), e.jsx("button", {
                        type: "button",
                        onClick: M,
                        disabled: !j.trim(),
                        style: {
                            padding: "8px 16px",
                            background: j.trim() ? "#007bff" : "#ccc",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: j.trim() ? "pointer" : "not-allowed",
                            opacity: j.trim() ? 1 : .6
                        },
                        children: "Inserir"
                    })]
                })]
            })
        }), D && e.jsx("div", {
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
                zIndex: 1e3
            },
            onClick: () => p(!1),
            children: e.jsxs("div", {
                onClick: r => r.stopPropagation(),
                style: {
                    background: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    width: "90%",
                    maxWidth: "400px"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "16px",
                        fontSize: "16px",
                        fontWeight: "600"
                    },
                    children: "Inserir Link"
                }), e.jsx("input", {
                    type: "text",
                    value: A,
                    onChange: r => T(r.target.value),
                    placeholder: "Texto do link",
                    style: {
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        marginBottom: "12px",
                        fontSize: "14px"
                    }
                }), e.jsx("input", {
                    type: "text",
                    value: S,
                    onChange: r => y(r.target.value),
                    placeholder: "URL (ex: https://exemplo.com)",
                    style: {
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        marginBottom: "12px",
                        fontSize: "14px"
                    },
                    onKeyPress: r => {
                        r.key === "Enter" && J()
                    }
                }), e.jsxs("div", {
                    style: {
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end"
                    },
                    children: [e.jsx("button", {
                        type: "button",
                        onClick: () => {
                            p(!1),
                            y(""),
                            T("")
                        }
                        ,
                        style: {
                            padding: "8px 16px",
                            background: "#f5f5f5",
                            border: "1px solid #dee2e6",
                            borderRadius: "4px",
                            cursor: "pointer"
                        },
                        children: "Cancelar"
                    }), e.jsx("button", {
                        type: "button",
                        onClick: J,
                        style: {
                            padding: "8px 16px",
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        },
                        children: "Inserir"
                    })]
                })]
            })
        })]
    })
}
async function oe(C) {
    if (!C.type.startsWith("image/"))
        throw new Error("Por favor, selecione apenas arquivos de imagem");
    if (C.size > 2 * 1024 * 1024)
        throw new Error("A imagem deve ter no máximo 2MB");
    let h = "";
    try {
        const l = await N.getAllConfiguracoesAdmin();
        l.upload_domain && (h = l.upload_domain)
    } catch (l) {
        console.error("Erro ao buscar configuração de upload_domain:", l)
    }
    if (!h)
        throw new Error("Domínio de upload não configurado. Configure em Configurações > Funcionalidades > Domínio de Upload de Imagens");
    h = h.replace(/\/$/, "").replace(/\/api-receiver\.php$/i, "");
    const I = new FormData;
    I.append("image", C);
    const a = await fetch(`${h}/api-receiver.php`, {
        method: "POST",
        headers: {
            "X-Signature": "adm1nfx2025.123@#$"
        },
        body: I
    });
    if (!a.ok)
        throw new Error(`Erro no upload: ${a.status}`);
    const b = await a.json();
    if (!b.url)
        throw new Error("API não retornou URL da imagem");
    return b.url
}
function Ae() {
    const C = Se()
      , {id: h} = we()
      , I = !!h
      , [a,b] = c.useState({
        id: "",
        nome: "",
        preco: "",
        preco_antigo: "",
        imagem: [],
        descricao: "",
        estoque: "1000",
        rating: "4.5",
        vendidos: "0",
        frete_gratis: 0,
        tem_variacoes: !1,
        variacoes: {},
        oculto: 0
    })
      , [l,j] = c.useState({
        tipo: "",
        label: "",
        usaImagem: !1,
        opcoes: [{
            nome: "",
            imagem: ""
        }]
    })
      , [L,D] = c.useState([])
      , [p,S] = c.useState(null)
      , [y,A] = c.useState({
        nome_usuario: "",
        avatar: "",
        nota: 5,
        comentario: "",
        compra_verificada: 1,
        imagens: ""
    })
      , [T,x] = c.useState(!1)
      , [P,$] = c.useState(!1)
      , [w,O] = c.useState(!1)
      , [z,M] = c.useState(!1)
      , [J,v] = c.useState(!1)
      , [r,u] = c.useState(!1)
      , [d,f] = c.useState("")
      , [k,W] = c.useState(!1)
      , [m,B] = c.useState(null)
      , [re,Y] = c.useState(!1)
      , [R,U] = c.useState(null)
      , [F,K] = c.useState(null)
      , [H,q] = c.useState(null)
      , [G,Q] = c.useState([])
      , [te,ae] = c.useState(!1)
      , ne = async o => {
        const i = Array.from(o.target.files);
        if (i.length === 0)
            return;
        const t = i.map( (s, g) => ({
            id: `loading-${Date.now()}-${g}`,
            name: s.name,
            loading: !0
        }));
        Q(s => [...s, ...t]);
        const n = i.map(async (s, g) => {
            try {
                const V = await oe(s);
                return Q(_ => _.filter(Z => Z.id !== t[g].id)),
                b(_ => ({
                    ..._,
                    imagem: Array.isArray(_.imagem) ? [..._.imagem, V] : [V]
                })),
                V
            } catch (V) {
                return alert(`Erro ao fazer upload de ${s.name}: ${V.message}`),
                Q(_ => _.filter(Z => Z.id !== t[g].id)),
                null
            }
        }
        );
        await Promise.all(n)
    }
      , se = o => {
        b(i => ({
            ...i,
            imagem: i.imagem.filter( (t, n) => n !== o)
        }))
    }
      , le = o => {
        K(o)
    }
      , de = o => {
        F !== null && q(o)
    }
      , ce = () => {
        q(null)
    }
      , pe = () => {
        if (F === null || H === null || F === H) {
            K(null),
            q(null);
            return
        }
        const o = [...a.imagem]
          , [i] = o.splice(F, 1);
        o.splice(H, 0, i),
        b(t => ({
            ...t,
            imagem: o
        })),
        K(null),
        q(null)
    }
      , me = () => {
        K(null),
        q(null)
    }
    ;
    c.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            C("/painelad");
            return
        }
        if (I) {
            const i = async () => {
                const n = await N.getProdutoById(h);
                n && b({
                    ...n,
                    imagem: Array.isArray(n.imagem) ? n.imagem : n.imagem ? [n.imagem] : [],
                    tem_variacoes: !!n.tem_variacoes,
                    variacoes: n.variacoes && typeof n.variacoes == "object" ? n.variacoes : {}
                })
            }
              , t = async () => {
                const n = await N.getAvaliacoesByProdutoId(h);
                D(n || [])
            }
            ;
            i(),
            t()
        }
    }
    , [C, I, h]);
    const E = o => {
        const {name: i, value: t, type: n, checked: s} = o.target;
        b(i === "tem_variacoes" ? {
            ...a,
            tem_variacoes: s,
            variacoes: s ? a.variacoes : {}
        } : {
            ...a,
            [i]: n === "checkbox" ? s ? 1 : 0 : t
        })
    }
      , xe = () => {
        j({
            ...l,
            opcoes: [...l.opcoes, {
                nome: "",
                imagem: ""
            }]
        })
    }
      , ge = o => {
        const i = l.opcoes.filter( (t, n) => n !== o);
        j({
            ...l,
            opcoes: i.length > 0 ? i : [{
                nome: "",
                imagem: ""
            }]
        })
    }
      , X = (o, i, t) => {
        if (i === "imagem" && t && typeof t == "string" && t.startsWith("data:")) {
            alert('⚠️ Imagens em base64 não são permitidas. Use o botão "📁 Escolher Imagem" para fazer upload ou cole uma URL válida (https://...)');
            return
        }
        const n = [...l.opcoes];
        typeof n[o] == "string" && (n[o] = {
            nome: n[o],
            imagem: ""
        }),
        n[o] = {
            ...n[o],
            [i]: t
        },
        j({
            ...l,
            opcoes: n
        })
    }
      , ue = async (o, i) => {
        const t = i.target.files[0];
        if (t)
            try {
                const n = await oe(t);
                X(o, "imagem", n)
            } catch (n) {
                alert(`Erro ao fazer upload: ${n.message}`)
            }
    }
      , fe = () => {
        if (!l.tipo || !l.label) {
            alert("Preencha o tipo e label da variação");
            return
        }
        const o = l.opcoes.filter(t => typeof t == "string" && t.trim() !== "" || typeof t == "object" && t.nome && t.nome.trim() !== "");
        if (o.length === 0) {
            alert("Adicione pelo menos uma opção");
            return
        }
        const i = {
            ...a.variacoes,
            [l.tipo]: {
                label: l.label,
                opcoes: l.usaImagem ? o.map(t => ({
                    nome: typeof t == "string" ? t : t.nome,
                    imagem: typeof t == "object" ? t.imagem : null
                })) : o.map(t => typeof t == "string" ? t : t.nome)
            }
        };
        b({
            ...a,
            variacoes: i
        }),
        j({
            tipo: "",
            label: "",
            usaImagem: !1,
            opcoes: [{
                nome: "",
                imagem: ""
            }]
        })
    }
      , he = o => {
        const i = {
            ...a.variacoes
        };
        delete i[o],
        b({
            ...a,
            variacoes: i
        })
    }
      , be = async () => {
        if (!y.nome_usuario || !y.comentario) {
            alert("Preencha o nome e o comentário");
            return
        }
        try {
            await N.insertAvaliacao({
                produto_id: h,
                ...y
            }),
            A({
                nome_usuario: "",
                avatar: "",
                nota: 5,
                comentario: "",
                compra_verificada: 1,
                imagens: ""
            });
            const o = await N.getAvaliacoesByProdutoId(h);
            D(o || []),
            M(!1),
            alert("Avaliação adicionada com sucesso!")
        } catch (o) {
            alert("Erro ao adicionar avaliação: " + o.message)
        }
    }
      , ye = o => {
        S({
            ...o,
            imagens: o.imagens || "",
            compra_verificada: o.compra_verificada !== void 0 && o.compra_verificada !== null ? o.compra_verificada === 1 || o.compra_verificada === !0 ? 1 : 0 : 1
        }),
        v(!0)
    }
      , ve = o => {
        f(o),
        u(!0)
    }
      , ie = () => {
        u(!1),
        f("")
    }
      , je = async () => {
        if (!p.nome_usuario || !p.comentario) {
            alert("Preencha o nome e o comentário");
            return
        }
        try {
            const o = p.compra_verificada === 1 || p.compra_verificada === !0 ? 1 : 0;
            await N.updateAvaliacao(p.id, {
                nome_usuario: p.nome_usuario,
                avatar: p.avatar || null,
                nota: parseInt(p.nota),
                comentario: p.comentario,
                compra_verificada: o,
                imagens: p.imagens || null
            });
            const i = await N.getAvaliacoesByProdutoId(h);
            D(i || []),
            v(!1),
            S(null),
            alert("Avaliação atualizada com sucesso!")
        } catch (o) {
            alert("Erro ao atualizar avaliação: " + o.message)
        }
    }
      , ke = async o => {
        if (confirm("Tem certeza que deseja excluir esta avaliação?"))
            try {
                await N.deleteAvaliacao(o);
                const i = await N.getAvaliacoesByProdutoId(h);
                D(i || []),
                alert("Avaliação excluída com sucesso!")
            } catch (i) {
                alert("Erro ao excluir avaliação: " + i.message)
            }
    }
      , Ce = async o => {
        if (o.preventDefault(),
        !(a.descricao ? a.descricao.replace(/<[^>]*>/g, "").trim() : "")) {
            alert("Por favor, preencha a descrição do produto.");
            return
        }
        if (Array.isArray(a.imagem) && a.imagem.some(s => s && typeof s == "string" && s.startsWith("data:"))) {
            alert("❌ ERRO: Existem imagens em base64 nas imagens do produto. Remova-as e faça upload novamente usando o botão de upload.");
            return
        }
        if (a.tem_variacoes && a.variacoes) {
            for (const [n,s] of Object.entries(a.variacoes))
                if (Array.isArray(s.opcoes)) {
                    for (const g of s.opcoes)
                        if (typeof g == "object" && g.imagem && g.imagem.startsWith("data:")) {
                            alert(`❌ ERRO: A variação "${n}" possui uma opção com imagem em base64. Remova e faça upload novamente.`);
                            return
                        }
                }
        }
        const t = {
            ...a,
            preco: parseFloat(a.preco),
            preco_antigo: a.preco_antigo ? parseFloat(a.preco_antigo) : null,
            estoque: parseInt(a.estoque),
            rating: parseFloat(a.rating),
            vendidos: parseInt(a.vendidos),
            variacoes: a.tem_variacoes ? JSON.stringify(a.variacoes) : null
        };
        try {
            const g = await (await fetch("/api/user/refresh", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })).json();
            if (!g.success) {
                alert("Erro ao renovar sessão. Faça login novamente."),
                C("/painelad");
                return
            }
            const V = g.csrfToken;
            localStorage.setItem("form_key", V),
            I ? (await N.updateProduto(h, t),
            alert("Produto atualizado com sucesso!")) : (await N.insertProduto(t),
            alert("Produto criado com sucesso!")),
            C("/painelad/produtos")
        } catch {
            alert("Erro ao salvar produto. Tente novamente.")
        }
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex"
        },
        children: [e.jsx(ze, {}), e.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "20px",
                background: "#f5f5f5",
                minHeight: "100vh",
                maxWidth: "calc(100vw - 250px)"
            },
            children: [e.jsxs("div", {
                style: {
                    marginBottom: "16px"
                },
                children: [e.jsx(ee, {
                    to: "/painelad/produtos",
                    style: {
                        color: "#1a1a1a",
                        textDecoration: "none",
                        fontSize: "13px",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "8px"
                    },
                    children: "← Voltar para Produtos"
                }), e.jsx("h1", {
                    style: {
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                        marginTop: "4px"
                    },
                    children: I ? "Editar Produto" : "Novo Produto"
                })]
            }), e.jsxs("form", {
                onSubmit: Ce,
                className: "admin-form",
                children: [e.jsxs("div", {
                    className: "admin-card",
                    style: {
                        marginBottom: "16px"
                    },
                    children: [e.jsx("h3", {
                        style: {
                            marginBottom: "16px",
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#1a1a1a"
                        },
                        children: "Informações Básicas"
                    }), I && e.jsxs("div", {
                        className: "admin-form-group",
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            children: "ID do Produto (Editável)"
                        }), e.jsx("input", {
                            type: "number",
                            name: "id",
                            value: a.id,
                            onChange: E,
                            placeholder: "ID único do produto",
                            className: "admin-form-input",
                            style: {
                                backgroundColor: "#fff3cd",
                                borderColor: "#ffc107"
                            }
                        }), e.jsx("small", {
                            style: {
                                color: "#856404",
                                fontSize: "12px",
                                marginTop: "4px",
                                display: "block"
                            },
                            children: "⚠️ Cuidado: Alterar o ID pode causar problemas se houver referências em outros lugares"
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-group",
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            children: "Nome do Produto *"
                        }), e.jsx("input", {
                            type: "text",
                            name: "nome",
                            value: a.nome,
                            onChange: E,
                            required: !0,
                            placeholder: "Ex: Patinete Elétrico 350W",
                            className: "admin-form-input"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            gap: "12px"
                        },
                        children: [e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                children: "Preço Completo (R$)"
                            }), e.jsx("input", {
                                type: "number",
                                name: "preco_antigo",
                                value: a.preco_antigo,
                                onChange: E,
                                step: "0.01",
                                placeholder: "0.00",
                                className: "admin-form-input"
                            })]
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                children: "Preço Com Desconto (R$) *"
                            }), e.jsx("input", {
                                type: "number",
                                name: "preco",
                                value: a.preco,
                                onChange: E,
                                required: !0,
                                step: "0.01",
                                placeholder: "0.00",
                                className: "admin-form-input"
                            })]
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                children: "Rating"
                            }), e.jsx("input", {
                                type: "number",
                                name: "rating",
                                value: a.rating,
                                onChange: E,
                                step: "0.1",
                                min: "0",
                                max: "5",
                                placeholder: "4.5",
                                className: "admin-form-input"
                            })]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr",
                            gap: "12px"
                        },
                        children: [e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                children: "Estoque *"
                            }), e.jsx("input", {
                                type: "number",
                                name: "estoque",
                                value: a.estoque,
                                onChange: E,
                                required: !0,
                                min: "0",
                                placeholder: "0",
                                className: "admin-form-input"
                            })]
                        }), e.jsxs("div", {
                            className: "admin-form-group",
                            children: [e.jsx("label", {
                                className: "admin-form-label",
                                children: "Vendidos"
                            }), e.jsx("input", {
                                type: "number",
                                name: "vendidos",
                                value: a.vendidos,
                                onChange: E,
                                min: "0",
                                placeholder: "0",
                                className: "admin-form-input"
                            })]
                        }), e.jsx("div", {
                            className: "admin-form-group",
                            children: e.jsxs("div", {
                                className: "admin-form-checkbox-group",
                                style: {
                                    marginTop: "28px"
                                },
                                children: [e.jsx("input", {
                                    type: "checkbox",
                                    name: "oculto",
                                    checked: a.oculto === 1,
                                    onChange: E,
                                    className: "admin-form-checkbox",
                                    id: "oculto"
                                }), e.jsx("label", {
                                    htmlFor: "oculto",
                                    style: {
                                        fontSize: "13px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                    },
                                    children: "🔒 Produto Oculto"
                                })]
                            })
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-group",
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            children: "Imagens do Produto"
                        }), e.jsx("input", {
                            type: "file",
                            accept: "image/*",
                            multiple: !0,
                            onChange: ne,
                            style: {
                                display: "none"
                            },
                            id: "image-upload"
                        }), Array.isArray(a.imagem) && a.imagem.length > 0 || G.length > 0 ? e.jsxs("div", {
                            style: {
                                marginTop: "8px",
                                padding: "12px",
                                background: "#f8f9fa",
                                borderRadius: "6px"
                            },
                            children: [e.jsxs("p", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666",
                                    fontWeight: "600",
                                    marginBottom: "8px"
                                },
                                children: ["Imagens (", a.imagem.length, G.length > 0 ? ` + ${G.length} enviando` : "", ")"]
                            }), e.jsxs("div", {
                                style: {
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                                    gap: "8px"
                                },
                                children: [a.imagem.map( (o, i) => {
                                    const t = /\.(mp4|webm|ogg|mov)$/i.test(o) || o.includes("video") || o.includes(".mp4")
                                      , n = a.imagem.find(s => !(/\.(mp4|webm|ogg|mov)$/i.test(s) || s.includes("video") || s.includes(".mp4")));
                                    return e.jsxs("div", {
                                        draggable: !0,
                                        onDragStart: () => le(i),
                                        onDragEnter: () => de(i),
                                        onDragLeave: ce,
                                        onDrop: pe,
                                        onDragEnd: me,
                                        onDragOver: s => s.preventDefault(),
                                        style: {
                                            position: "relative",
                                            border: F === i ? "2px solid #007bff" : H === i ? "2px solid #28a745" : "2px solid #dee2e6",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            cursor: "move",
                                            opacity: F === i ? .5 : 1,
                                            transform: H === i ? "scale(1.05)" : "scale(1)",
                                            transition: "all 0.2s",
                                            backgroundColor: H === i ? "#e7f3ff" : "transparent"
                                        },
                                        children: [t ? e.jsx("video", {
                                            src: o,
                                            poster: n || void 0,
                                            preload: "metadata",
                                            muted: !0,
                                            style: {
                                                width: "100%",
                                                height: "120px",
                                                objectFit: "cover",
                                                display: "block",
                                                pointerEvents: "none"
                                            },
                                            children: "Seu navegador não suporta vídeos."
                                        }) : e.jsx("img", {
                                            src: o,
                                            alt: `Preview ${i + 1}`,
                                            style: {
                                                width: "100%",
                                                height: "100px",
                                                objectFit: "cover",
                                                display: "block",
                                                pointerEvents: "none"
                                            },
                                            onError: s => {
                                                s.target.style.display = "none"
                                            }
                                        }), t && e.jsx("div", {
                                            style: {
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                width: "32px",
                                                height: "32px",
                                                background: "rgba(0, 0, 0, 0.7)",
                                                borderRadius: "50%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                pointerEvents: "none",
                                                zIndex: 2
                                            },
                                            children: e.jsx("div", {
                                                style: {
                                                    width: 0,
                                                    height: 0,
                                                    borderLeft: "10px solid white",
                                                    borderTop: "6px solid transparent",
                                                    borderBottom: "6px solid transparent",
                                                    marginLeft: "2px"
                                                }
                                            })
                                        }), e.jsx("button", {
                                            type: "button",
                                            onClick: s => {
                                                s.stopPropagation(),
                                                se(i)
                                            }
                                            ,
                                            style: {
                                                position: "absolute",
                                                top: "4px",
                                                right: "4px",
                                                padding: "4px 8px",
                                                background: "#dc3545",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "4px",
                                                fontSize: "11px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                                zIndex: 10
                                            },
                                            children: "✕"
                                        }), e.jsx("div", {
                                            style: {
                                                position: "absolute",
                                                bottom: "4px",
                                                left: "4px",
                                                padding: "2px 6px",
                                                background: "rgba(0,0,0,0.6)",
                                                color: "white",
                                                borderRadius: "4px",
                                                fontSize: "10px",
                                                fontWeight: "600",
                                                pointerEvents: "none",
                                                zIndex: 2
                                            },
                                            children: i + 1
                                        })]
                                    }, `img-${i}`)
                                }
                                ), G.map(o => e.jsx("div", {
                                    style: {
                                        position: "relative",
                                        border: "2px dashed #007bff",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        backgroundColor: "#f0f7ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100px"
                                    },
                                    children: e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: "8px"
                                        },
                                        children: [e.jsx("div", {
                                            style: {
                                                width: "24px",
                                                height: "24px",
                                                border: "3px solid #007bff",
                                                borderTop: "3px solid transparent",
                                                borderRadius: "50%",
                                                animation: "spin 1s linear infinite"
                                            }
                                        }), e.jsx("style", {
                                            children: `
                              @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                              }
                            `
                                        }), e.jsx("span", {
                                            style: {
                                                fontSize: "9px",
                                                color: "#007bff",
                                                fontWeight: "600",
                                                textAlign: "center",
                                                padding: "0 4px"
                                            },
                                            children: "Enviando..."
                                        })]
                                    })
                                }, o.id))]
                            }), e.jsx("small", {
                                style: {
                                    color: "#666",
                                    fontSize: "10px",
                                    marginTop: "6px",
                                    display: "block"
                                },
                                children: "💡 A primeira imagem será usada como capa. Arraste para reordenar."
                            }), e.jsx("label", {
                                htmlFor: "image-upload",
                                style: {
                                    display: "inline-block",
                                    padding: "8px 16px",
                                    background: "#007bff",
                                    color: "white",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    marginTop: "12px"
                                },
                                children: "📁 Adicionar Mais Imagens"
                            }), e.jsx("small", {
                                style: {
                                    marginLeft: "10px",
                                    color: "#666",
                                    fontSize: "11px"
                                },
                                children: "(Máx. 2MB)"
                            })]
                        }) : e.jsxs("div", {
                            style: {
                                marginTop: "8px"
                            },
                            children: [e.jsx("label", {
                                htmlFor: "image-upload",
                                style: {
                                    display: "inline-block",
                                    padding: "8px 16px",
                                    background: "#007bff",
                                    color: "white",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "600"
                                },
                                children: "📁 Escolher Imagens"
                            }), e.jsx("small", {
                                style: {
                                    marginLeft: "10px",
                                    color: "#666",
                                    fontSize: "11px"
                                },
                                children: "(Máx. 2MB)"
                            })]
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-group",
                        children: [e.jsx("label", {
                            className: "admin-form-label",
                            children: "Descrição *"
                        }), e.jsx("small", {
                            style: {
                                display: "block",
                                color: "#666",
                                fontSize: "11px",
                                marginBottom: "6px"
                            },
                            children: "Use as ferramentas para formatar o texto"
                        }), e.jsx(Ie, {
                            value: a.descricao,
                            onChange: o => {
                                b({
                                    ...a,
                                    descricao: o
                                })
                            }
                            ,
                            placeholder: "Descreva o produto..."
                        }), !a.descricao && e.jsx("small", {
                            style: {
                                display: "block",
                                color: "#dc3545",
                                fontSize: "11px",
                                marginTop: "4px"
                            },
                            children: "* Obrigatória"
                        })]
                    })]
                }), e.jsxs("div", {
                    className: "admin-card",
                    style: {
                        marginBottom: "16px"
                    },
                    children: [e.jsxs("div", {
                        onClick: () => O(!w),
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            marginBottom: w ? "12px" : "0",
                            padding: "6px 0",
                            userSelect: "none"
                        },
                        children: [e.jsx("h3", {
                            style: {
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#1a1a1a"
                            },
                            children: "Variações de Produto"
                        }), e.jsx("svg", {
                            style: {
                                width: "24px",
                                height: "24px",
                                transform: w ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease"
                            },
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: e.jsx("polyline", {
                                points: "6 9 12 15 18 9"
                            })
                        })]
                    }), w && e.jsxs(e.Fragment, {
                        children: [e.jsx("p", {
                            style: {
                                marginBottom: "12px",
                                fontSize: "12px",
                                color: "#666",
                                lineHeight: "1.4"
                            },
                            children: "Configure variações como cor, tamanho, etc."
                        }), e.jsx("div", {
                            className: "admin-form-group",
                            children: e.jsxs("div", {
                                className: "admin-form-checkbox-group",
                                children: [e.jsx("input", {
                                    type: "checkbox",
                                    name: "tem_variacoes",
                                    checked: a.tem_variacoes,
                                    onChange: E,
                                    className: "admin-form-checkbox",
                                    id: "tem_variacoes"
                                }), e.jsx("label", {
                                    htmlFor: "tem_variacoes",
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        cursor: "pointer"
                                    },
                                    children: "Este produto possui variações (cor, tamanho, etc.)"
                                })]
                            })
                        }), a.tem_variacoes && e.jsxs("div", {
                            style: {
                                marginTop: "12px",
                                padding: "16px",
                                background: "#f8f9fa",
                                borderRadius: "8px"
                            },
                            children: [e.jsx("h4", {
                                style: {
                                    marginBottom: "12px",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                },
                                children: "Variações Cadastradas"
                            }), Object.keys(a.variacoes).length === 0 ? e.jsx("p", {
                                style: {
                                    color: "#999",
                                    fontSize: "12px",
                                    marginBottom: "12px"
                                },
                                children: "Nenhuma variação cadastrada ainda."
                            }) : e.jsx("div", {
                                style: {
                                    marginBottom: "12px"
                                },
                                children: Object.entries(a.variacoes).map( ([o,i]) => e.jsxs("div", {
                                    style: {
                                        background: "white",
                                        padding: "12px",
                                        borderRadius: "6px",
                                        marginBottom: "8px",
                                        border: "1px solid #e0e0e0"
                                    },
                                    children: [e.jsxs("div", {
                                        style: {
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "start",
                                            marginBottom: "8px"
                                        },
                                        children: [e.jsxs("div", {
                                            children: [e.jsx("strong", {
                                                style: {
                                                    fontSize: "13px",
                                                    color: "#1a1a1a"
                                                },
                                                children: i.label
                                            }), e.jsxs("span", {
                                                style: {
                                                    color: "#666",
                                                    fontSize: "11px",
                                                    marginLeft: "6px"
                                                },
                                                children: ["(tipo: ", o, ")"]
                                            })]
                                        }), e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                gap: "6px"
                                            },
                                            children: [e.jsx("button", {
                                                type: "button",
                                                onClick: () => {
                                                    U({
                                                        tipoOriginal: o,
                                                        tipo: o,
                                                        label: i.label
                                                    }),
                                                    Y(!0)
                                                }
                                                ,
                                                className: "admin-btn",
                                                style: {
                                                    padding: "4px 10px",
                                                    fontSize: "11px",
                                                    background: "#007bff",
                                                    color: "white"
                                                },
                                                children: "Editar"
                                            }), e.jsx("button", {
                                                type: "button",
                                                onClick: () => he(o),
                                                className: "admin-btn admin-btn-danger",
                                                style: {
                                                    padding: "4px 10px",
                                                    fontSize: "11px"
                                                },
                                                children: "Remover"
                                            })]
                                        })]
                                    }), e.jsxs("div", {
                                        style: {
                                            fontSize: "12px",
                                            color: "#555"
                                        },
                                        children: [e.jsx("strong", {
                                            children: "Opções:"
                                        }), Array.isArray(i.opcoes) && i.opcoes.length > 0 ? e.jsxs("div", {
                                            style: {
                                                display: "grid",
                                                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                                                gap: "8px",
                                                marginTop: "8px"
                                            },
                                            children: [i.opcoes.map( (t, n) => {
                                                const s = typeof t == "string" ? {
                                                    nome: t
                                                } : t;
                                                return e.jsxs("div", {
                                                    style: {
                                                        border: "1px solid #e0e0e0",
                                                        borderRadius: "6px",
                                                        padding: "6px",
                                                        textAlign: "center",
                                                        background: "#fafafa",
                                                        position: "relative"
                                                    },
                                                    children: [s.imagem && e.jsx("img", {
                                                        src: s.imagem,
                                                        alt: s.nome,
                                                        style: {
                                                            width: "100%",
                                                            height: "60px",
                                                            objectFit: "cover",
                                                            borderRadius: "4px",
                                                            marginBottom: "4px"
                                                        },
                                                        onError: g => {
                                                            g.target.style.display = "none"
                                                        }
                                                    }), e.jsx("div", {
                                                        style: {
                                                            fontSize: "11px",
                                                            fontWeight: "500",
                                                            color: "#333",
                                                            marginBottom: "6px"
                                                        },
                                                        children: s.nome
                                                    }), e.jsxs("div", {
                                                        style: {
                                                            display: "flex",
                                                            gap: "4px",
                                                            justifyContent: "center"
                                                        },
                                                        children: [e.jsx("button", {
                                                            type: "button",
                                                            onClick: () => {
                                                                const g = typeof t == "string" ? {
                                                                    nome: t,
                                                                    imagem: ""
                                                                } : t;
                                                                B({
                                                                    tipoVariacao: o,
                                                                    indiceOpcao: n,
                                                                    nome: g.nome,
                                                                    imagem: g.imagem || "",
                                                                    config: i
                                                                }),
                                                                W(!0)
                                                            }
                                                            ,
                                                            style: {
                                                                background: "#007bff",
                                                                color: "white",
                                                                border: "none",
                                                                padding: "4px 8px",
                                                                borderRadius: "4px",
                                                                fontSize: "11px",
                                                                cursor: "pointer",
                                                                flex: 1
                                                            },
                                                            children: "✏️"
                                                        }), e.jsx("button", {
                                                            type: "button",
                                                            onClick: () => {
                                                                if (confirm(`Excluir opção "${s.nome}"?`)) {
                                                                    const g = i.opcoes.filter( (V, _) => _ !== n);
                                                                    b({
                                                                        ...a,
                                                                        variacoes: {
                                                                            ...a.variacoes,
                                                                            [o]: {
                                                                                ...i,
                                                                                opcoes: g
                                                                            }
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            ,
                                                            style: {
                                                                background: "#dc3545",
                                                                color: "white",
                                                                border: "none",
                                                                padding: "4px 8px",
                                                                borderRadius: "4px",
                                                                fontSize: "11px",
                                                                cursor: "pointer",
                                                                flex: 1
                                                            },
                                                            children: "🗑️"
                                                        })]
                                                    })]
                                                }, n)
                                            }
                                            ), e.jsx("div", {
                                                onClick: () => {
                                                    B({
                                                        tipoVariacao: o,
                                                        indiceOpcao: -1,
                                                        nome: "",
                                                        imagem: "",
                                                        config: i
                                                    }),
                                                    W(!0)
                                                }
                                                ,
                                                style: {
                                                    border: "2px dashed #ccc",
                                                    borderRadius: "8px",
                                                    padding: "8px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minHeight: "120px",
                                                    cursor: "pointer",
                                                    background: "#f8f9fa",
                                                    transition: "all 0.2s"
                                                },
                                                onMouseEnter: t => {
                                                    t.currentTarget.style.borderColor = "#007bff",
                                                    t.currentTarget.style.background = "#e7f3ff"
                                                }
                                                ,
                                                onMouseLeave: t => {
                                                    t.currentTarget.style.borderColor = "#ccc",
                                                    t.currentTarget.style.background = "#f8f9fa"
                                                }
                                                ,
                                                children: e.jsxs("div", {
                                                    style: {
                                                        textAlign: "center",
                                                        color: "#666"
                                                    },
                                                    children: [e.jsx("div", {
                                                        style: {
                                                            fontSize: "24px",
                                                            marginBottom: "4px"
                                                        },
                                                        children: "+"
                                                    }), e.jsx("div", {
                                                        style: {
                                                            fontSize: "12px"
                                                        },
                                                        children: "Adicionar"
                                                    })]
                                                })
                                            })]
                                        }) : e.jsx("span", {
                                            children: " Nenhuma opção"
                                        })]
                                    })]
                                }, o))
                            }), e.jsxs("div", {
                                style: {
                                    borderTop: "1px solid #dee2e6",
                                    paddingTop: "12px"
                                },
                                children: [e.jsxs("div", {
                                    onClick: () => x(!T),
                                    style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        padding: "8px 12px",
                                        background: "#f8f9fa",
                                        borderRadius: "6px",
                                        marginBottom: T ? "12px" : "0",
                                        transition: "all 0.3s ease"
                                    },
                                    children: [e.jsx("h4", {
                                        style: {
                                            margin: 0,
                                            fontSize: "13px",
                                            fontWeight: "600"
                                        },
                                        children: "➕ Adicionar Nova Variação"
                                    }), e.jsx("span", {
                                        style: {
                                            fontSize: "16px",
                                            transform: T ? "rotate(180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease"
                                        },
                                        children: "▼"
                                    })]
                                }), T && e.jsxs(e.Fragment, {
                                    children: [e.jsxs("div", {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "12px",
                                            marginBottom: "12px"
                                        },
                                        children: [e.jsxs("div", {
                                            className: "admin-form-group",
                                            children: [e.jsx("label", {
                                                className: "admin-form-label",
                                                children: "Tipo (ID único)"
                                            }), e.jsx("input", {
                                                type: "text",
                                                value: l.tipo,
                                                onChange: o => j({
                                                    ...l,
                                                    tipo: o.target.value
                                                }),
                                                placeholder: "Ex: cor, tamanho, voltagem",
                                                className: "admin-form-input"
                                            }), e.jsx("small", {
                                                style: {
                                                    color: "#666",
                                                    fontSize: "12px",
                                                    marginTop: "4px",
                                                    display: "block"
                                                },
                                                children: "Use letras minúsculas sem espaços (ex: cor, tamanho)"
                                            })]
                                        }), e.jsxs("div", {
                                            className: "admin-form-group",
                                            children: [e.jsx("label", {
                                                className: "admin-form-label",
                                                children: "Label (nome para exibir)"
                                            }), e.jsx("input", {
                                                type: "text",
                                                value: l.label,
                                                onChange: o => j({
                                                    ...l,
                                                    label: o.target.value
                                                }),
                                                placeholder: "Ex: Cor, Tamanho, Voltagem",
                                                className: "admin-form-input"
                                            })]
                                        })]
                                    }), e.jsx("div", {
                                        className: "admin-form-group",
                                        children: e.jsxs("div", {
                                            className: "admin-form-checkbox-group",
                                            children: [e.jsx("input", {
                                                type: "checkbox",
                                                checked: l.usaImagem,
                                                onChange: o => j({
                                                    ...l,
                                                    usaImagem: o.target.checked
                                                }),
                                                className: "admin-form-checkbox",
                                                id: "usa_imagem"
                                            }), e.jsx("label", {
                                                htmlFor: "usa_imagem",
                                                style: {
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                },
                                                children: "Esta variação usa imagens (ex: cores com imagem)"
                                            })]
                                        })
                                    }), e.jsxs("div", {
                                        className: "admin-form-group",
                                        children: [e.jsx("label", {
                                            className: "admin-form-label",
                                            children: "Opções"
                                        }), l.opcoes.map( (o, i) => {
                                            const t = typeof o == "string" ? {
                                                nome: o,
                                                imagem: ""
                                            } : o;
                                            return e.jsxs("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "8px",
                                                    marginBottom: "12px",
                                                    padding: l.usaImagem ? "12px" : "0",
                                                    background: l.usaImagem ? "#f8f9fa" : "transparent",
                                                    borderRadius: "8px",
                                                    border: l.usaImagem ? "1px solid #e0e0e0" : "none"
                                                },
                                                children: [e.jsxs("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [e.jsx("input", {
                                                        type: "text",
                                                        value: t.nome,
                                                        onChange: n => X(i, "nome", n.target.value),
                                                        placeholder: `Nome da opção ${i + 1}`,
                                                        className: "admin-form-input",
                                                        style: {
                                                            marginBottom: l.usaImagem ? "8px" : "0"
                                                        }
                                                    }), l.usaImagem && e.jsxs("div", {
                                                        children: [e.jsxs("div", {
                                                            style: {
                                                                display: "flex",
                                                                gap: "8px",
                                                                alignItems: "center"
                                                            },
                                                            children: [e.jsx("input", {
                                                                type: "file",
                                                                accept: "image/*",
                                                                onChange: n => ue(i, n),
                                                                style: {
                                                                    display: "none"
                                                                },
                                                                id: `var-img-${i}`
                                                            }), e.jsx("label", {
                                                                htmlFor: `var-img-${i}`,
                                                                style: {
                                                                    display: "inline-block",
                                                                    padding: "6px 12px",
                                                                    background: "#007bff",
                                                                    color: "white",
                                                                    borderRadius: "4px",
                                                                    cursor: "pointer",
                                                                    fontSize: "12px",
                                                                    fontWeight: "500"
                                                                },
                                                                children: "📁 Escolher Imagem"
                                                            }), e.jsx("span", {
                                                                style: {
                                                                    fontSize: "11px",
                                                                    color: "#999"
                                                                },
                                                                children: "ou"
                                                            }), e.jsx("input", {
                                                                type: "text",
                                                                value: t.imagem && t.imagem.startsWith("data:") ? "" : t.imagem || "",
                                                                onChange: n => X(i, "imagem", n.target.value),
                                                                placeholder: "Cole URL da imagem",
                                                                className: "admin-form-input",
                                                                style: {
                                                                    flex: 1,
                                                                    padding: "6px 10px",
                                                                    fontSize: "12px"
                                                                }
                                                            })]
                                                        }), t.imagem && e.jsxs("div", {
                                                            style: {
                                                                marginTop: "8px",
                                                                position: "relative"
                                                            },
                                                            children: [e.jsx("img", {
                                                                src: t.imagem,
                                                                alt: t.nome,
                                                                style: {
                                                                    width: "60px",
                                                                    height: "60px",
                                                                    objectFit: "cover",
                                                                    borderRadius: "6px",
                                                                    border: "2px solid #dee2e6"
                                                                },
                                                                onError: n => {
                                                                    n.target.style.display = "none"
                                                                }
                                                            }), e.jsx("button", {
                                                                type: "button",
                                                                onClick: () => X(i, "imagem", ""),
                                                                style: {
                                                                    position: "absolute",
                                                                    top: "-4px",
                                                                    left: "52px",
                                                                    background: "#dc3545",
                                                                    color: "white",
                                                                    border: "none",
                                                                    borderRadius: "50%",
                                                                    width: "20px",
                                                                    height: "20px",
                                                                    fontSize: "12px",
                                                                    cursor: "pointer",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    padding: 0
                                                                },
                                                                children: "×"
                                                            })]
                                                        })]
                                                    })]
                                                }), l.opcoes.length > 1 && e.jsx("button", {
                                                    type: "button",
                                                    onClick: () => ge(i),
                                                    className: "admin-btn admin-btn-danger",
                                                    style: {
                                                        padding: "12px 16px",
                                                        alignSelf: l.usaImagem ? "flex-start" : "center"
                                                    },
                                                    children: "×"
                                                })]
                                            }, i)
                                        }
                                        ), e.jsx("button", {
                                            type: "button",
                                            onClick: xe,
                                            style: {
                                                background: "#e0e0e0",
                                                border: "none",
                                                padding: "8px 16px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                marginTop: "8px"
                                            },
                                            children: "+ Adicionar Opção"
                                        })]
                                    }), e.jsx("button", {
                                        type: "button",
                                        onClick: fe,
                                        className: "admin-btn admin-btn-primary",
                                        style: {
                                            marginTop: "16px"
                                        },
                                        children: "Salvar Variação"
                                    })]
                                })]
                            })]
                        })]
                    })]
                }), I && e.jsxs("div", {
                    className: "admin-card",
                    style: {
                        marginBottom: "16px"
                    },
                    children: [e.jsxs("div", {
                        onClick: () => $(!P),
                        style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            marginBottom: P ? "12px" : "0",
                            padding: "6px 0",
                            userSelect: "none"
                        },
                        children: [e.jsxs("h3", {
                            style: {
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#1a1a1a"
                            },
                            children: ["Comentários e Avaliações (", L.length, ")"]
                        }), e.jsx("svg", {
                            style: {
                                width: "24px",
                                height: "24px",
                                transform: P ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease"
                            },
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            children: e.jsx("polyline", {
                                points: "6 9 12 15 18 9"
                            })
                        })]
                    }), P && (L.length === 0 ? e.jsx("p", {
                        style: {
                            color: "#999",
                            fontSize: "12px",
                            textAlign: "center",
                            padding: "16px 0"
                        },
                        children: "Nenhuma avaliação ainda para este produto."
                    }) : e.jsx("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        },
                        children: L.map(o => {
                            var i;
                            return e.jsx("div", {
                                style: {
                                    background: "#f8f9fa",
                                    padding: "12px",
                                    borderRadius: "6px",
                                    border: "1px solid #e0e0e0"
                                },
                                children: e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        gap: "10px",
                                        marginBottom: "8px"
                                    },
                                    children: [o.avatar ? e.jsx("img", {
                                        src: o.avatar,
                                        alt: o.nome_usuario,
                                        style: {
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "2px solid #e0e0e0"
                                        },
                                        onError: t => {
                                            t.target.style.display = "none"
                                        }
                                    }) : e.jsx("div", {
                                        style: {
                                            width: "40px",
                                            height: "40px",
                                            borderRadius: "50%",
                                            background: "#007bff",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "16px",
                                            fontWeight: "600"
                                        },
                                        children: ((i = o.nome_usuario) == null ? void 0 : i.charAt(0).toUpperCase()) || "?"
                                    }), e.jsxs("div", {
                                        style: {
                                            flex: 1
                                        },
                                        children: [e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "start"
                                            },
                                            children: [e.jsxs("div", {
                                                children: [e.jsx("strong", {
                                                    style: {
                                                        fontSize: "13px",
                                                        color: "#1a1a1a"
                                                    },
                                                    children: o.nome_usuario
                                                }), e.jsxs("div", {
                                                    style: {
                                                        display: "flex",
                                                        gap: "3px",
                                                        marginTop: "3px",
                                                        alignItems: "center"
                                                    },
                                                    children: [[1, 2, 3, 4, 5].map(t => e.jsx("span", {
                                                        style: {
                                                            color: t <= o.nota ? "#ffc107" : "#ddd",
                                                            fontSize: "12px"
                                                        },
                                                        children: "★"
                                                    }, t)), e.jsxs("span", {
                                                        style: {
                                                            marginLeft: "6px",
                                                            color: "#666",
                                                            fontSize: "11px"
                                                        },
                                                        children: [o.nota, "/5"]
                                                    }), o.compra_verificada && e.jsx("span", {
                                                        style: {
                                                            marginLeft: "6px",
                                                            fontSize: "10px",
                                                            background: "#28a745",
                                                            color: "white",
                                                            padding: "2px 5px",
                                                            borderRadius: "3px",
                                                            fontWeight: "600"
                                                        },
                                                        children: "✓"
                                                    })]
                                                })]
                                            }), e.jsx("span", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#999"
                                                },
                                                children: o.data ? new Date(o.data).toLocaleDateString("pt-BR") : ""
                                            })]
                                        }), e.jsx("p", {
                                            style: {
                                                color: "#555",
                                                fontSize: "12px",
                                                lineHeight: "1.5",
                                                margin: "6px 0 0 0"
                                            },
                                            children: o.comentario
                                        }), o.imagens && o.imagens.trim() !== "" && o.imagens !== "[]" && ( () => {
                                            let t = [];
                                            try {
                                                o.imagens.startsWith("[") ? t = JSON.parse(o.imagens) : t = o.imagens.split(",").map(s => s.trim()).filter(s => s)
                                            } catch {
                                                t = o.imagens.split(",").map(g => g.trim()).filter(g => g)
                                            }
                                            const n = s => /\.(mp4|webm|ogg|mov)$/i.test(s) || s.includes("video");
                                            return t.length > 0 ? e.jsx("div", {
                                                style: {
                                                    display: "flex",
                                                    gap: "6px",
                                                    flexWrap: "wrap",
                                                    marginTop: "8px"
                                                },
                                                children: t.map( (s, g) => n(s) ? e.jsxs("div", {
                                                    style: {
                                                        position: "relative",
                                                        width: "60px",
                                                        height: "60px",
                                                        cursor: "pointer"
                                                    },
                                                    onClick: () => ve(s),
                                                    children: [e.jsx("video", {
                                                        style: {
                                                            width: "100%",
                                                            height: "100%",
                                                            borderRadius: "4px",
                                                            objectFit: "cover",
                                                            border: "1px solid #ddd"
                                                        },
                                                        children: e.jsx("source", {
                                                            src: s,
                                                            type: "video/mp4"
                                                        })
                                                    }), e.jsx("div", {
                                                        style: {
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                            width: "24px",
                                                            height: "24px",
                                                            background: "rgba(0, 0, 0, 0.7)",
                                                            borderRadius: "50%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            pointerEvents: "none"
                                                        },
                                                        children: e.jsx("div", {
                                                            style: {
                                                                width: 0,
                                                                height: 0,
                                                                borderLeft: "8px solid white",
                                                                borderTop: "5px solid transparent",
                                                                borderBottom: "5px solid transparent",
                                                                marginLeft: "2px"
                                                            }
                                                        })
                                                    })]
                                                }, g) : e.jsx("img", {
                                                    src: s,
                                                    alt: `Foto ${g + 1} da avaliação`,
                                                    style: {
                                                        width: "60px",
                                                        height: "60px",
                                                        borderRadius: "4px",
                                                        objectFit: "cover",
                                                        border: "1px solid #ddd"
                                                    }
                                                }, g))
                                            }) : null
                                        }
                                        )(), e.jsxs("div", {
                                            style: {
                                                display: "flex",
                                                gap: "6px",
                                                marginTop: "8px"
                                            },
                                            children: [e.jsx("button", {
                                                type: "button",
                                                onClick: () => ye(o),
                                                style: {
                                                    padding: "4px 10px",
                                                    background: "#007bff",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                },
                                                children: "✏️ Editar"
                                            }), e.jsx("button", {
                                                type: "button",
                                                onClick: () => ke(o.id),
                                                style: {
                                                    padding: "4px 10px",
                                                    background: "#dc3545",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    fontSize: "11px",
                                                    fontWeight: "600",
                                                    cursor: "pointer"
                                                },
                                                children: "🗑️ Excluir"
                                            })]
                                        })]
                                    })]
                                })
                            }, o.id)
                        }
                        )
                    })), P && e.jsx("button", {
                        type: "button",
                        onClick: () => M(!0),
                        style: {
                            marginTop: "12px",
                            padding: "8px 16px",
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        },
                        children: "➕ Adicionar Nova Avaliação"
                    })]
                }), e.jsxs("div", {
                    className: "admin-form-actions",
                    children: [e.jsx(ee, {
                        to: "/painelad/produtos",
                        style: {
                            flex: 1
                        },
                        children: e.jsx("button", {
                            type: "button",
                            style: {
                                width: "100%",
                                padding: "10px 24px",
                                background: "#f5f5f5",
                                color: "#333",
                                border: "2px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Cancelar"
                        })
                    }), I && e.jsx(ee, {
                        to: `/produto/${h}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                            flex: 1
                        },
                        children: e.jsxs("button", {
                            type: "button",
                            style: {
                                width: "100%",
                                padding: "10px 24px",
                                background: "#007bff",
                                color: "white",
                                border: "2px solid #007bff",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-eye"
                            }), "Visualizar"]
                        })
                    }), e.jsxs("button", {
                        type: "submit",
                        className: "admin-btn",
                        style: {
                            flex: 1,
                            padding: "10px 24px",
                            fontSize: "14px"
                        },
                        children: [I ? "Atualizar" : "Criar", " Produto"]
                    })]
                })]
            })]
        }), z && e.jsx("div", {
            onClick: () => M(!1),
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
                zIndex: 1e3
            },
            children: e.jsxs("div", {
                onClick: o => o.stopPropagation(),
                style: {
                    background: "white",
                    padding: "32px",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "24px",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1a1a1a"
                    },
                    children: "➕ Adicionar Nova Avaliação"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gap: "16px"
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
                            children: "Nome do Usuário *"
                        }), e.jsx("input", {
                            type: "text",
                            value: y.nome_usuario,
                            onChange: o => A({
                                ...y,
                                nome_usuario: o.target.value
                            }),
                            placeholder: "Ex: João Silva",
                            className: "admin-form-input"
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
                            children: "Avatar do Usuário (opcional)"
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            },
                            children: [y.avatar && e.jsx("img", {
                                src: y.avatar,
                                alt: "Avatar",
                                style: {
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "2px solid #ddd"
                                }
                            }), e.jsxs("label", {
                                htmlFor: "avatar-upload-new",
                                style: {
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                },
                                children: ["📁 Escolher Imagem"]
                            }), e.jsx("input", {
                                id: "avatar-upload-new",
                                type: "file",
                                accept: "image/*",
                                onChange: async o => {
                                    const file = o.target.files[0];
                                    if (!file) return;
                                    if (!file.type.startsWith("image/")) {
                                        alert("Por favor, selecione apenas arquivos de imagem");
                                        return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("A imagem deve ter no máximo 2MB");
                                        return;
                                    }
                                    let domain = "";
                                    try {
                                        const cfg = await N.getAllConfiguracoesAdmin();
                                        if (cfg.upload_domain) domain = cfg.upload_domain;
                                    } catch (err) {
                                        console.error("Erro ao buscar upload_domain:", err);
                                    }
                                    if (!domain) {
                                        alert("Domínio de upload não configurado");
                                        return;
                                    }
                                    domain = domain.replace(/\/$/, "").replace(/\/api-receiver\.php$/i, "");
                                    const fd = new FormData();
                                    fd.append("image", file);
                                    try {
                                        const res = await fetch(`${domain}/api-receiver.php`, {
                                            method: "POST",
                                            headers: {
                                                "X-Signature": "adm1nfx2025.123@#$"
                                            },
                                            body: fd
                                        });
                                        if (!res.ok) throw new Error(`Erro no upload: ${res.status}`);
                                        const data = await res.json();
                                        if (data.url) A({
                                            ...y,
                                            avatar: data.url
                                        })
                                    } catch (err) {
                                        console.error(err);
                                        alert("Erro ao fazer upload da imagem");
                                    }
                                },
                                style: {
                                    display: "none"
                                }
                            }), y.avatar && e.jsx("button", {
                                type: "button",
                                onClick: () => A({
                                    ...y,
                                    avatar: ""
                                }),
                                style: {
                                    padding: "8px 15px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                },
                                children: "🗑️ Remover"
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
                            children: "Nota (1-5) *"
                        }), e.jsxs("select", {
                            value: y.nota,
                            onChange: o => A({
                                ...y,
                                nota: parseInt(o.target.value)
                            }),
                            className: "admin-form-input",
                            children: [e.jsx("option", {
                                value: "1",
                                children: "⭐ 1 estrela"
                            }), e.jsx("option", {
                                value: "2",
                                children: "⭐⭐ 2 estrelas"
                            }), e.jsx("option", {
                                value: "3",
                                children: "⭐⭐⭐ 3 estrelas"
                            }), e.jsx("option", {
                                value: "4",
                                children: "⭐⭐⭐⭐ 4 estrelas"
                            }), e.jsx("option", {
                                value: "5",
                                children: "⭐⭐⭐⭐⭐ 5 estrelas"
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
                            children: "Comentário *"
                        }), e.jsx("textarea", {
                            value: y.comentario,
                            onChange: o => A({
                                ...y,
                                comentario: o.target.value
                            }),
                            placeholder: "Escreva o comentário da avaliação...",
                            className: "admin-form-textarea",
                            rows: "4"
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
                            children: "Imagem do Produto na Avaliação (opcional)"
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginTop: "8px"
                            },
                            children: [y.imagem_produto && e.jsx("img", {
                                src: y.imagem_produto,
                                alt: "Produto",
                                style: {
                                    width: "80px",
                                    height: "80px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "2px solid #ddd"
                                }
                            }), e.jsxs("label", {
                                htmlFor: "produto-img-upload-new",
                                style: {
                                    padding: "10px 20px",
                                    backgroundColor: "#17a2b8",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                },
                                children: ["📷 Escolher Imagem"]
                            }), e.jsx("input", {
                                id: "produto-img-upload-new",
                                type: "file",
                                accept: "image/*",
                                onChange: async o => {
                                    const file = o.target.files[0];
                                    if (!file) return;
                                    if (!file.type.startsWith("image/")) {
                                        alert("Por favor, selecione apenas arquivos de imagem");
                                        return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("A imagem deve ter no máximo 2MB");
                                        return;
                                    }
                                    let domain = "";
                                    try {
                                        const cfg = await N.getAllConfiguracoesAdmin();
                                        if (cfg.upload_domain) domain = cfg.upload_domain;
                                    } catch (err) {
                                        console.error("Erro ao buscar upload_domain:", err);
                                    }
                                    if (!domain) {
                                        alert("Domínio de upload não configurado");
                                        return;
                                    }
                                    domain = domain.replace(/\/$/, "").replace(/\/api-receiver\.php$/i, "");
                                    const fd = new FormData();
                                    fd.append("image", file);
                                    try {
                                        const res = await fetch(`${domain}/api-receiver.php`, {
                                            method: "POST",
                                            headers: {
                                                "X-Signature": "adm1nfx2025.123@#$"
                                            },
                                            body: fd
                                        });
                                        if (!res.ok) throw new Error(`Erro no upload: ${res.status}`);
                                        const data = await res.json();
                                        if (data.url) A({
                                            ...y,
                                            imagem_produto: data.url
                                        })
                                    } catch (err) {
                                        console.error(err);
                                        alert("Erro ao fazer upload da imagem");
                                    }
                                },
                                style: {
                                    display: "none"
                                }
                            }), y.imagem_produto && e.jsx("button", {
                                type: "button",
                                onClick: () => A({
                                    ...y,
                                    imagem_produto: ""
                                }),
                                style: {
                                    padding: "8px 15px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                },
                                children: "🗑️ Remover"
                            })]
                        }), e.jsx("p", {
                            style: {
                                fontSize: "12px",
                                color: "#666",
                                marginTop: "8px"
                            },
                            children: "Foto do produto que o cliente compartilhou na avaliação"
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
                            children: "URLs de Imagens (opcional, separadas por vírgula)"
                        }), e.jsx("input", {
                            type: "text",
                            value: y.imagens,
                            onChange: o => A({
                                ...y,
                                imagens: o.target.value
                            }),
                            placeholder: "https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg",
                            className: "admin-form-input"
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-checkbox-group",
                        children: [e.jsx("input", {
                            type: "checkbox",
                            checked: y.compra_verificada === 1,
                            onChange: o => A({
                                ...y,
                                compra_verificada: o.target.checked ? 1 : 0
                            }),
                            className: "admin-form-checkbox",
                            id: "nova_compra_verificada"
                        }), e.jsx("label", {
                            htmlFor: "nova_compra_verificada",
                            style: {
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "✓ Compra Verificada"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "8px"
                        },
                        children: [e.jsx("button", {
                            type: "button",
                            onClick: () => M(!1),
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#f5f5f5",
                                color: "#333",
                                border: "2px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Cancelar"
                        }), e.jsx("button", {
                            type: "button",
                            onClick: be,
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "➕ Adicionar Avaliação"
                        })]
                    })]
                })]
            })
        }), J && p && e.jsx("div", {
            onClick: () => v(!1),
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
                zIndex: 1e3
            },
            children: e.jsxs("div", {
                onClick: o => o.stopPropagation(),
                style: {
                    background: "white",
                    padding: "32px",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "600px",
                    maxHeight: "90vh",
                    overflowY: "auto"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "24px",
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1a1a1a"
                    },
                    children: "✏️ Editar Avaliação"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gap: "16px"
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
                            children: "Nome do Usuário *"
                        }), e.jsx("input", {
                            type: "text",
                            value: p.nome_usuario,
                            onChange: o => S({
                                ...p,
                                nome_usuario: o.target.value
                            }),
                            placeholder: "Ex: João Silva",
                            className: "admin-form-input"
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
                            children: "Avatar do Usuário (opcional)"
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginTop: "8px"
                            },
                            children: [p.avatar && e.jsx("img", {
                                src: p.avatar,
                                alt: "Avatar",
                                style: {
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                    border: "2px solid #ddd"
                                }
                            }), e.jsxs("label", {
                                htmlFor: "avatar-upload-edit",
                                style: {
                                    padding: "10px 20px",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    display: "inline-block",
                                    fontSize: "14px",
                                    fontWeight: "600"
                                },
                                children: ["📁 Escolher Imagem"]
                            }), e.jsx("input", {
                                id: "avatar-upload-edit",
                                type: "file",
                                accept: "image/*",
                                onChange: async o => {
                                    const file = o.target.files[0];
                                    if (!file) return;
                                    if (!file.type.startsWith("image/")) {
                                        alert("Por favor, selecione apenas arquivos de imagem");
                                        return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("A imagem deve ter no máximo 2MB");
                                        return;
                                    }
                                    let domain = "";
                                    try {
                                        const cfg = await N.getAllConfiguracoesAdmin();
                                        if (cfg.upload_domain) domain = cfg.upload_domain;
                                    } catch (err) {
                                        console.error("Erro ao buscar upload_domain:", err);
                                    }
                                    if (!domain) {
                                        alert("Domínio de upload não configurado");
                                        return;
                                    }
                                    domain = domain.replace(/\/$/, "").replace(/\/api-receiver\.php$/i, "");
                                    const fd = new FormData();
                                    fd.append("image", file);
                                    try {
                                        const res = await fetch(`${domain}/api-receiver.php`, {
                                            method: "POST",
                                            headers: {
                                                "X-Signature": "adm1nfx2025.123@#$"
                                            },
                                            body: fd
                                        });
                                        if (!res.ok) throw new Error(`Erro no upload: ${res.status}`);
                                        const data = await res.json();
                                        if (data.url) S({
                                            ...p,
                                            avatar: data.url
                                        })
                                    } catch (err) {
                                        console.error(err);
                                        alert("Erro ao fazer upload da imagem");
                                    }
                                },
                                style: {
                                    display: "none"
                                }
                            }), p.avatar && e.jsx("button", {
                                type: "button",
                                onClick: () => S({
                                    ...p,
                                    avatar: ""
                                }),
                                style: {
                                    padding: "8px 15px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontSize: "14px"
                                },
                                children: "🗑️ Remover"
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
                            children: "Nota (1-5) *"
                        }), e.jsxs("select", {
                            value: p.nota,
                            onChange: o => S({
                                ...p,
                                nota: parseInt(o.target.value)
                            }),
                            className: "admin-form-input",
                            children: [e.jsx("option", {
                                value: "1",
                                children: "⭐ 1 estrela"
                            }), e.jsx("option", {
                                value: "2",
                                children: "⭐⭐ 2 estrelas"
                            }), e.jsx("option", {
                                value: "3",
                                children: "⭐⭐⭐ 3 estrelas"
                            }), e.jsx("option", {
                                value: "4",
                                children: "⭐⭐⭐⭐ 4 estrelas"
                            }), e.jsx("option", {
                                value: "5",
                                children: "⭐⭐⭐⭐⭐ 5 estrelas"
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
                            children: "Comentário *"
                        }), e.jsx("textarea", {
                            value: p.comentario,
                            onChange: o => S({
                                ...p,
                                comentario: o.target.value
                            }),
                            placeholder: "Escreva o comentário da avaliação...",
                            className: "admin-form-textarea",
                            rows: "4"
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
                            children: "URLs de Imagens (opcional, separadas por vírgula)"
                        }), e.jsx("input", {
                            type: "text",
                            value: p.imagens || "",
                            onChange: o => S({
                                ...p,
                                imagens: o.target.value
                            }),
                            placeholder: "https://exemplo.com/img1.jpg, https://exemplo.com/img2.jpg",
                            className: "admin-form-input"
                        })]
                    }), e.jsxs("div", {
                        className: "admin-form-checkbox-group",
                        children: [e.jsx("input", {
                            type: "checkbox",
                            checked: p.compra_verificada === 1,
                            onChange: o => S({
                                ...p,
                                compra_verificada: o.target.checked ? 1 : 0
                            }),
                            className: "admin-form-checkbox",
                            id: "editar_compra_verificada"
                        }), e.jsx("label", {
                            htmlFor: "editar_compra_verificada",
                            style: {
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "✓ Compra Verificada"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "8px"
                        },
                        children: [e.jsx("button", {
                            type: "button",
                            onClick: () => {
                                v(!1),
                                S(null)
                            }
                            ,
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#f5f5f5",
                                color: "#333",
                                border: "2px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Cancelar"
                        }), e.jsx("button", {
                            type: "button",
                            onClick: je,
                            style: {
                                flex: 1,
                                padding: "12px 24px",
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "✓ Salvar Alterações"
                        })]
                    })]
                })]
            })
        }), k && m && e.jsx("div", {
            onClick: () => {
                W(!1),
                B(null)
            }
            ,
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
                zIndex: 1e3
            },
            children: e.jsxs("div", {
                onClick: o => o.stopPropagation(),
                style: {
                    background: "white",
                    padding: "24px",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "500px"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "20px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1a1a1a"
                    },
                    children: m.indiceOpcao === -1 ? "➕ Adicionar Opção de Variação" : "✏️ Editar Opção de Variação"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gap: "16px"
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
                            children: "Nome da Opção *"
                        }), e.jsx("input", {
                            type: "text",
                            value: m.nome,
                            onChange: o => B({
                                ...m,
                                nome: o.target.value
                            }),
                            placeholder: "Ex: Vermelho, Pequeno",
                            className: "admin-form-input"
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
                            children: "Imagem"
                        }), m.imagem && !te && e.jsx("div", {
                            style: {
                                marginBottom: "12px",
                                position: "relative",
                                display: "inline-block"
                            },
                            children: e.jsx("img", {
                                src: m.imagem,
                                alt: m.nome,
                                style: {
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "2px solid #dee2e6"
                                },
                                onError: o => {
                                    o.target.style.display = "none"
                                }
                            })
                        }), te && e.jsx("div", {
                            style: {
                                marginBottom: "12px",
                                width: "120px",
                                height: "120px",
                                border: "2px dashed #007bff",
                                borderRadius: "8px",
                                backgroundColor: "#f0f7ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            },
                            children: e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "8px"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        width: "32px",
                                        height: "32px",
                                        border: "3px solid #007bff",
                                        borderTop: "3px solid transparent",
                                        borderRadius: "50%",
                                        animation: "spin 1s linear infinite"
                                    }
                                }), e.jsx("span", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#007bff",
                                        fontWeight: "600"
                                    },
                                    children: "Enviando..."
                                })]
                            })
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                marginBottom: "8px"
                            },
                            children: [e.jsx("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: async o => {
                                    const i = o.target.files[0];
                                    if (i) {
                                        ae(!0);
                                        try {
                                            const t = await oe(i);
                                            B({
                                                ...m,
                                                imagem: t
                                            })
                                        } catch (t) {
                                            alert(`Erro ao fazer upload: ${t.message}`)
                                        } finally {
                                            ae(!1)
                                        }
                                    }
                                }
                                ,
                                style: {
                                    display: "none"
                                },
                                id: "edit-var-img-upload"
                            }), e.jsxs("label", {
                                htmlFor: "edit-var-img-upload",
                                style: {
                                    display: "inline-block",
                                    padding: "8px 16px",
                                    background: "#007bff",
                                    color: "white",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "500"
                                },
                                children: ["📁 ", m.imagem ? "Alterar Imagem" : "Escolher Imagem"]
                            }), m.imagem && e.jsx("button", {
                                type: "button",
                                onClick: () => {
                                    confirm("Tem certeza que deseja remover a imagem?") && B({
                                        ...m,
                                        imagem: ""
                                    })
                                }
                                ,
                                style: {
                                    padding: "8px 16px",
                                    background: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "500"
                                },
                                children: "🗑️ Remover Imagem"
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "flex",
                                gap: "8px",
                                alignItems: "center"
                            },
                            children: [e.jsx("span", {
                                style: {
                                    fontSize: "12px",
                                    color: "#666"
                                },
                                children: "ou"
                            }), e.jsx("input", {
                                type: "text",
                                value: m.imagem && m.imagem.startsWith("data:") ? "" : m.imagem || "",
                                onChange: o => {
                                    const i = o.target.value;
                                    if (i && i.startsWith("data:")) {
                                        alert('⚠️ Imagens em base64 não são permitidas. Use o botão "📁 Escolher Imagem" para fazer upload ou cole uma URL válida (https://...)');
                                        return
                                    }
                                    B({
                                        ...m,
                                        imagem: i
                                    })
                                }
                                ,
                                placeholder: "Cole URL da imagem",
                                className: "admin-form-input",
                                style: {
                                    flex: 1,
                                    padding: "8px 12px",
                                    fontSize: "13px"
                                }
                            })]
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "8px"
                        },
                        children: [e.jsx("button", {
                            type: "button",
                            onClick: () => {
                                W(!1),
                                B(null)
                            }
                            ,
                            style: {
                                flex: 1,
                                padding: "10px 20px",
                                background: "#f5f5f5",
                                color: "#333",
                                border: "2px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Cancelar"
                        }), e.jsx("button", {
                            type: "button",
                            onClick: () => {
                                if (!m.nome || !m.nome.trim()) {
                                    alert("O nome da opção é obrigatório");
                                    return
                                }
                                const o = [...m.config.opcoes];
                                if (m.config.opcoes.some(t => typeof t == "object" && t.imagem) || m.imagem) {
                                    const t = {
                                        nome: m.nome.trim(),
                                        imagem: m.imagem || ""
                                    };
                                    m.indiceOpcao === -1 ? o.push(t) : o[m.indiceOpcao] = t
                                } else
                                    m.indiceOpcao === -1 ? o.push(m.nome.trim()) : o[m.indiceOpcao] = m.nome.trim();
                                b({
                                    ...a,
                                    variacoes: {
                                        ...a.variacoes,
                                        [m.tipoVariacao]: {
                                            ...m.config,
                                            opcoes: o
                                        }
                                    }
                                }),
                                W(!1),
                                B(null)
                            }
                            ,
                            style: {
                                flex: 1,
                                padding: "10px 20px",
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "✓ Salvar"
                        })]
                    })]
                })]
            })
        }), r && e.jsx("div", {
            style: {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1e4,
                padding: "20px"
            },
            onClick: ie,
            children: e.jsxs("div", {
                style: {
                    position: "relative",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    width: "800px"
                },
                onClick: o => o.stopPropagation(),
                children: [e.jsx("button", {
                    onClick: ie,
                    style: {
                        position: "absolute",
                        top: "-40px",
                        right: "0",
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "32px",
                        cursor: "pointer",
                        padding: "5px 15px",
                        fontWeight: "bold"
                    },
                    children: "✕"
                }), e.jsx("video", {
                    src: d,
                    controls: !0,
                    autoPlay: !0,
                    style: {
                        width: "100%",
                        height: "auto",
                        maxHeight: "80vh",
                        borderRadius: "8px"
                    }
                })]
            })
        }), re && R && e.jsx("div", {
            onClick: () => {
                Y(!1),
                U(null)
            }
            ,
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
                zIndex: 1e3,
                padding: "20px"
            },
            children: e.jsxs("div", {
                onClick: o => o.stopPropagation(),
                style: {
                    background: "white",
                    padding: "32px",
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "800px",
                    maxHeight: "90vh",
                    overflowY: "auto"
                },
                children: [e.jsx("h3", {
                    style: {
                        marginBottom: "20px",
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1a1a1a"
                    },
                    children: "✏️ Editar Variação"
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gap: "16px"
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
                            children: "Tipo (ID único) *"
                        }), e.jsx("input", {
                            type: "text",
                            value: R.tipo,
                            onChange: o => U({
                                ...R,
                                tipo: o.target.value
                            }),
                            placeholder: "Ex: cor, tamanho, voltagem",
                            className: "admin-form-input"
                        }), e.jsx("small", {
                            style: {
                                color: "#666",
                                fontSize: "12px",
                                marginTop: "4px",
                                display: "block"
                            },
                            children: "Use letras minúsculas sem espaços (ex: cor, tamanho)"
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
                            children: "Label (nome para exibir) *"
                        }), e.jsx("input", {
                            type: "text",
                            value: R.label,
                            onChange: o => U({
                                ...R,
                                label: o.target.value
                            }),
                            placeholder: "Ex: Cor, Tamanho, Voltagem",
                            className: "admin-form-input"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            marginTop: "8px"
                        },
                        children: [e.jsx("button", {
                            type: "button",
                            onClick: () => {
                                Y(!1),
                                U(null)
                            }
                            ,
                            style: {
                                flex: 1,
                                padding: "10px 20px",
                                background: "#f5f5f5",
                                color: "#333",
                                border: "2px solid #e0e0e0",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "Cancelar"
                        }), e.jsx("button", {
                            type: "button",
                            onClick: () => {
                                if (!R.tipo || !R.tipo.trim()) {
                                    alert("O tipo é obrigatório");
                                    return
                                }
                                if (!R.label || !R.label.trim()) {
                                    alert("O label é obrigatório");
                                    return
                                }
                                const o = R.tipo.trim()
                                  , i = R.tipoOriginal;
                                if (o !== i && a.variacoes[o]) {
                                    alert("Já existe uma variação com este tipo");
                                    return
                                }
                                const t = {
                                    ...a.variacoes
                                }
                                  , n = t[i];
                                delete t[i],
                                t[o] = {
                                    ...n,
                                    label: R.label.trim()
                                },
                                b({
                                    ...a,
                                    variacoes: t
                                }),
                                Y(!1),
                                U(null)
                            }
                            ,
                            style: {
                                flex: 1,
                                padding: "10px 20px",
                                background: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                            },
                            children: "✓ Salvar"
                        })]
                    })]
                })]
            })
        })]
    })
}
export {Ae as default};

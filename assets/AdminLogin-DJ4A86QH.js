import {u as b, a as j, r as s, j as e, d as v} from "./index-Z_n8MByG.js";
function k() {
    const l = b()
      , d = j()
      , [x,g] = s.useState("")
      , [p,f] = s.useState("")
      , [r,c] = s.useState(!1)
      , [h,a] = s.useState("")
      , [i,u] = s.useState(!1);
    s.useEffect( () => {
        var n;
        if (localStorage.getItem("app_state")) {
            const o = ((n = d.state) == null ? void 0 : n.from) || "/painelad/dashboard";
            l(o, {
                replace: !0
            })
        }
    }
    , [l, d]);
    const m = async t => {
        var n;
        t.preventDefault(),
        c(!0),
        a("");
        try {
            const o = await v.verificarSenhaAdmin(x, p);
            if (o.success) {
                o.sessionId && localStorage.setItem("user_id", o.sessionId),
                o.csrfToken && localStorage.setItem("form_key", o.csrfToken),
                localStorage.setItem("app_state", "true");
                const y = ((n = d.state) == null ? void 0 : n.from) || "/painelad/dashboard";
                l(y, {
                    replace: !0
                })
            } else
                o.blocked ? (u(!0),
                a(o.error)) : a("Username ou senha incorretos!")
        } catch {
            a("Erro ao verificar senha. Tente novamente.")
        } finally {
            c(!1)
        }
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex",
            minHeight: "100vh",
            overflow: "hidden"
        },
        children: [e.jsxs("div", {
            className: "admin-login__left",
            style: {
                flex: "1",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "60px",
                color: "white",
                position: "relative",
                overflow: "hidden"
            },
            children: [e.jsx("div", {
                style: {
                    position: "absolute",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    top: "-100px",
                    left: "-100px",
                    border: "2px solid rgba(255, 255, 255, 0.2)"
                }
            }), e.jsx("div", {
                style: {
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.05)",
                    bottom: "-80px",
                    right: "-80px",
                    border: "2px solid rgba(255, 255, 255, 0.15)"
                }
            }), e.jsxs("div", {
                style: {
                    position: "relative",
                    zIndex: 1,
                    textAlign: "center",
                    maxWidth: "500px"
                },
                children: [e.jsx("div", {
                    style: {
                        width: "100px",
                        height: "100px",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 40px",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.3)"
                    },
                    children: e.jsxs("svg", {
                        width: "50",
                        height: "50",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "white",
                        strokeWidth: "2",
                        children: [e.jsx("rect", {
                            x: "3",
                            y: "11",
                            width: "18",
                            height: "11",
                            rx: "2",
                            ry: "2"
                        }), e.jsx("path", {
                            d: "M7 11V7a5 5 0 0 1 10 0v4"
                        })]
                    })
                }), e.jsx("h1", {
                    style: {
                        fontSize: "42px",
                        fontWeight: "700",
                        marginBottom: "16px",
                        letterSpacing: "-0.5px"
                    },
                    children: "Painel Administrativo"
                }), e.jsx("p", {
                    style: {
                        fontSize: "18px",
                        opacity: "0.9",
                        lineHeight: "1.6",
                        marginBottom: "40px",
                        fontWeight: "300"
                    },
                    children: "Acesse o painel administrativo da sua loja"
                }), e.jsxs("div", {
                    style: {
                        textAlign: "left",
                        marginTop: "60px"
                    },
                    children: [e.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px"
                        },
                        children: [e.jsx("div", {
                            style: {
                                width: "40px",
                                height: "40px",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "16px"
                            },
                            children: e.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                children: e.jsx("polyline", {
                                    points: "20 6 9 17 4 12"
                                })
                            })
                        }), e.jsx("span", {
                            style: {
                                fontSize: "16px",
                                opacity: "0.95"
                            },
                            children: "Gerenciamento de produtos"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px"
                        },
                        children: [e.jsx("div", {
                            style: {
                                width: "40px",
                                height: "40px",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "16px"
                            },
                            children: e.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                children: e.jsx("polyline", {
                                    points: "20 6 9 17 4 12"
                                })
                            })
                        }), e.jsx("span", {
                            style: {
                                fontSize: "16px",
                                opacity: "0.95"
                            },
                            children: "Controle de vendas e pedidos"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                width: "40px",
                                height: "40px",
                                background: "rgba(255, 255, 255, 0.2)",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "16px"
                            },
                            children: e.jsx("svg", {
                                width: "20",
                                height: "20",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "white",
                                strokeWidth: "2",
                                children: e.jsx("polyline", {
                                    points: "20 6 9 17 4 12"
                                })
                            })
                        }), e.jsx("span", {
                            style: {
                                fontSize: "16px",
                                opacity: "0.95"
                            },
                            children: "Análise e relatórios"
                        })]
                    })]
                })]
            })]
        }), e.jsx("div", {
            style: {
                flex: "1",
                background: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px"
            },
            children: e.jsxs("div", {
                style: {
                    width: "100%",
                    maxWidth: "440px"
                },
                children: [e.jsxs("div", {
                    style: {
                        marginBottom: "48px"
                    },
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "32px",
                            fontWeight: "700",
                            color: "#1a1a1a",
                            marginBottom: "8px"
                        },
                        children: "Bem-vindo de volta"
                    }), e.jsx("p", {
                        style: {
                            fontSize: "15px",
                            color: "#6b7280",
                            fontWeight: "400"
                        },
                        children: "Faça login para acessar o painel"
                    })]
                }), e.jsxs("form", {
                    onSubmit: m,
                    autoComplete: "on",
                    children: [e.jsxs("div", {
                        style: {
                            marginBottom: "24px"
                        },
                        children: [e.jsx("label", {
                            htmlFor: "username",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#374151"
                            },
                            children: "Username"
                        }), e.jsx("input", {
                            id: "username",
                            name: "username",
                            type: "text",
                            value: x,
                            onChange: t => g(t.target.value),
                            placeholder: "Digite seu username",
                            required: !0,
                            disabled: i,
                            autoComplete: "username",
                            style: {
                                width: "100%",
                                padding: "14px 16px",
                                border: "2px solid #e5e7eb",
                                borderRadius: "10px",
                                fontSize: "15px",
                                opacity: i ? .6 : 1,
                                outline: "none",
                                transition: "all 0.2s",
                                background: i ? "#f9fafb" : "#ffffff"
                            },
                            onFocus: t => t.target.style.borderColor = "#667eea",
                            onBlur: t => t.target.style.borderColor = "#e5e7eb"
                        })]
                    }), e.jsxs("div", {
                        style: {
                            marginBottom: "24px"
                        },
                        children: [e.jsx("label", {
                            htmlFor: "password",
                            style: {
                                display: "block",
                                fontSize: "14px",
                                fontWeight: "600",
                                marginBottom: "8px",
                                color: "#374151"
                            },
                            children: "Senha"
                        }), e.jsx("input", {
                            id: "password",
                            name: "password",
                            type: "password",
                            value: p,
                            onChange: t => f(t.target.value),
                            placeholder: "Digite sua senha",
                            required: !0,
                            disabled: i,
                            autoComplete: "current-password",
                            style: {
                                width: "100%",
                                padding: "14px 16px",
                                border: "2px solid #e5e7eb",
                                borderRadius: "10px",
                                fontSize: "15px",
                                opacity: i ? .6 : 1,
                                outline: "none",
                                transition: "all 0.2s",
                                background: i ? "#f9fafb" : "#ffffff"
                            },
                            onFocus: t => t.target.style.borderColor = "#667eea",
                            onBlur: t => t.target.style.borderColor = "#e5e7eb"
                        })]
                    }), h && e.jsxs("div", {
                        style: {
                            marginBottom: "24px",
                            padding: "14px 16px",
                            background: i ? "#fef2f2" : "#fef3c7",
                            border: `2px solid ${i ? "#fecaca" : "#fde68a"}`,
                            borderRadius: "10px",
                            color: i ? "#991b1b" : "#92400e",
                            fontSize: "14px",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        },
                        children: [e.jsxs("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            children: [e.jsx("circle", {
                                cx: "12",
                                cy: "12",
                                r: "10"
                            }), e.jsx("line", {
                                x1: "12",
                                y1: "8",
                                x2: "12",
                                y2: "12"
                            }), e.jsx("line", {
                                x1: "12",
                                y1: "16",
                                x2: "12.01",
                                y2: "16"
                            })]
                        }), h]
                    }), e.jsx("button", {
                        type: "submit",
                        disabled: r || i,
                        style: {
                            width: "100%",
                            padding: "16px",
                            background: r || i ? "#9ca3af" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "10px",
                            fontSize: "16px",
                            fontWeight: "600",
                            cursor: r || i ? "not-allowed" : "pointer",
                            transition: "all 0.3s",
                            boxShadow: r || i ? "none" : "0 4px 14px rgba(102, 126, 234, 0.4)"
                        },
                        onMouseEnter: t => {
                            !r && !i && (t.target.style.transform = "translateY(-2px)",
                            t.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)")
                        }
                        ,
                        onMouseLeave: t => {
                            t.target.style.transform = "translateY(0)",
                            t.target.style.boxShadow = r || i ? "none" : "0 4px 14px rgba(102, 126, 234, 0.4)"
                        }
                        ,
                        children: i ? "🔒 Bloqueado" : r ? "⏳ Verificando..." : "Entrar no painel"
                    })]
                }), e.jsx("div", {
                    style: {
                        marginTop: "32px",
                        padding: "16px",
                        background: "#f9fafb",
                        borderRadius: "10px",
                        border: "1px solid #e5e7eb"
                    },
                    children: e.jsxs("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        },
                        children: [e.jsxs("svg", {
                            width: "18",
                            height: "18",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#6b7280",
                            strokeWidth: "2",
                            children: [e.jsx("rect", {
                                x: "3",
                                y: "11",
                                width: "18",
                                height: "11",
                                rx: "2",
                                ry: "2"
                            }), e.jsx("path", {
                                d: "M7 11V7a5 5 0 0 1 10 0v4"
                            })]
                        }), e.jsx("p", {
                            style: {
                                fontSize: "13px",
                                color: "#6b7280",
                                margin: 0,
                                lineHeight: "1.5"
                            },
                            children: "Sua sessão é protegida."
                        })]
                    })
                })]
            })
        }), e.jsx("style", {
            children: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .admin-login__left {
            display: none !important;
          }
        }
      `
        })]
    })
}
export {k as default};

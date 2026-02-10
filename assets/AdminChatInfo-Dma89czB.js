import {u as n, r, j as e} from "./index-Z_n8MByG.js";
import {A as s} from "./AdminSidebar-DpwmTKwH.js";
function c() {
    const o = n();
    r.useEffect( () => {
        localStorage.getItem("app_state") || o("/adminf3n1x")
    }
    , [o]);
    const t = (a, i) => {
        navigator.clipboard.writeText(a),
        alert(`${i} copiado para a área de transferência!`)
    }
    ;
    return e.jsxs("div", {
        style: {
            display: "flex",
            minHeight: "100vh",
            background: "#f5f5f5"
        },
        children: [e.jsx(s, {}), e.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "40px",
                maxWidth: "1200px"
            },
            children: [e.jsxs("div", {
                style: {
                    marginBottom: "32px"
                },
                children: [e.jsx("h1", {
                    style: {
                        fontSize: "32px",
                        fontWeight: "bold",
                        color: "#1a1a1a",
                        marginBottom: "8px"
                    },
                    children: "💬 Chat Admin - Informações"
                }), e.jsx("p", {
                    style: {
                        fontSize: "16px",
                        color: "#666",
                        lineHeight: "1.6"
                    },
                    children: "Acesse o sistema de atendimento ao cliente via chat em tempo real."
                })]
            }), e.jsxs("div", {
                style: {
                    background: "white",
                    borderRadius: "12px",
                    padding: "32px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    marginBottom: "24px"
                },
                children: [e.jsxs("div", {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "24px"
                    },
                    children: [e.jsx("div", {
                        style: {
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px"
                        },
                        children: "🔐"
                    }), e.jsxs("div", {
                        children: [e.jsx("h2", {
                            style: {
                                fontSize: "20px",
                                fontWeight: "600",
                                color: "#1a1a1a",
                                marginBottom: "4px"
                            },
                            children: "Credenciais de Acesso"
                        }), e.jsx("p", {
                            style: {
                                fontSize: "14px",
                                color: "#666"
                            },
                            children: "Use estas informações para acessar o painel de atendimento"
                        })]
                    })]
                }), e.jsxs("div", {
                    style: {
                        marginBottom: "24px"
                    },
                    children: [e.jsx("label", {
                        style: {
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#666",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        },
                        children: "URL de Acesso"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                flex: 1,
                                padding: "14px 16px",
                                background: "#f8f9fa",
                                border: "2px solid #e9ecef",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontFamily: "monospace",
                                color: "#1a1a1a",
                                fontWeight: "500"
                            },
                            children: [window.location.origin, "/chat-admin"]
                        }), e.jsxs("button", {
                            onClick: () => t(`${window.location.origin}/chat-admin`, "URL"),
                            style: {
                                padding: "14px 20px",
                                background: "#667eea",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                whiteSpace: "nowrap"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-copy"
                            }), "Copiar"]
                        })]
                    })]
                }), e.jsxs("div", {
                    children: [e.jsx("label", {
                        style: {
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#666",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        },
                        children: "Senha Padrão"
                    }), e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "12px",
                            alignItems: "center"
                        },
                        children: [e.jsx("div", {
                            style: {
                                flex: 1,
                                padding: "14px 16px",
                                background: "#f8f9fa",
                                border: "2px solid #e9ecef",
                                borderRadius: "8px",
                                fontSize: "15px",
                                fontFamily: "monospace",
                                color: "#1a1a1a",
                                fontWeight: "500"
                            },
                            children: "chat-admin"
                        }), e.jsxs("button", {
                            onClick: () => t("chat-admin", "Senha"),
                            style: {
                                padding: "14px 20px",
                                background: "#667eea",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                whiteSpace: "nowrap"
                            },
                            children: [e.jsx("i", {
                                className: "fa-solid fa-copy"
                            }), "Copiar"]
                        })]
                    })]
                })]
            }), e.jsxs("div", {
                style: {
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "12px",
                    padding: "32px",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
                    marginBottom: "24px",
                    textAlign: "center"
                },
                children: [e.jsx("h3", {
                    style: {
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "white",
                        marginBottom: "12px"
                    },
                    children: "Pronto para atender seus clientes?"
                }), e.jsx("p", {
                    style: {
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.9)",
                        marginBottom: "20px",
                        lineHeight: "1.6"
                    },
                    children: "Clique no botão abaixo para acessar o painel de atendimento em tempo real."
                }), e.jsxs("a", {
                    href: "/chat-admin",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "14px 32px",
                        background: "white",
                        color: "#667eea",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        transition: "all 0.2s"
                    },
                    onMouseOver: a => a.currentTarget.style.transform = "translateY(-2px)",
                    onMouseOut: a => a.currentTarget.style.transform = "translateY(0)",
                    children: [e.jsx("i", {
                        className: "fa-solid fa-comments"
                    }), "Acessar Chat Admin", e.jsx("i", {
                        className: "fa-solid fa-arrow-up-right-from-square"
                    })]
                })]
            }), e.jsxs("div", {
                style: {
                    background: "white",
                    borderRadius: "12px",
                    padding: "32px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    marginBottom: "24px"
                },
                children: [e.jsxs("h2", {
                    style: {
                        fontSize: "20px",
                        fontWeight: "600",
                        color: "#1a1a1a",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    },
                    children: [e.jsx("i", {
                        className: "fa-solid fa-book",
                        style: {
                            color: "#667eea"
                        }
                    }), "Como usar o Chat Admin"]
                }), e.jsx("div", {
                    style: {
                        display: "grid",
                        gap: "20px"
                    },
                    children: [{
                        numero: "1",
                        titulo: "Acesse o painel",
                        descricao: 'Clique no botão "Acessar Chat Admin" ou acesse diretamente a URL /chat-admin',
                        icon: "fa-arrow-right-to-bracket"
                    }, {
                        numero: "2",
                        titulo: "Faça login",
                        descricao: 'Digite seu nome de atendente e a senha "chat-admin" para entrar no sistema',
                        icon: "fa-user-lock"
                    }, {
                        numero: "3",
                        titulo: "Visualize as conversas",
                        descricao: "Todas as conversas abertas aparecerão na lista lateral. Clique em uma para visualizar",
                        icon: "fa-list"
                    }, {
                        numero: "4",
                        titulo: "Inicie o atendimento",
                        descricao: 'Clique em "Iniciar Atendimento" para enviar a primeira mensagem ao cliente',
                        icon: "fa-play"
                    }, {
                        numero: "5",
                        titulo: "Converse em tempo real",
                        descricao: "Digite suas mensagens e responda o cliente. As mensagens são atualizadas automaticamente",
                        icon: "fa-message"
                    }, {
                        numero: "6",
                        titulo: "Finalize quando necessário",
                        descricao: 'Quando terminar o atendimento, clique em "Finalizar Atendimento" para encerrar a conversa',
                        icon: "fa-check-circle"
                    }].map( (a, i) => e.jsxs("div", {
                        style: {
                            display: "flex",
                            gap: "16px",
                            padding: "20px",
                            background: "#f8f9fa",
                            borderRadius: "8px",
                            border: "1px solid #e9ecef"
                        },
                        children: [e.jsx("div", {
                            style: {
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                fontWeight: "bold",
                                flexShrink: 0
                            },
                            children: a.numero
                        }), e.jsxs("div", {
                            style: {
                                flex: 1
                            },
                            children: [e.jsxs("h3", {
                                style: {
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    color: "#1a1a1a",
                                    marginBottom: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                },
                                children: [e.jsx("i", {
                                    className: `fa-solid ${a.icon}`,
                                    style: {
                                        color: "#667eea"
                                    }
                                }), a.titulo]
                            }), e.jsx("p", {
                                style: {
                                    fontSize: "14px",
                                    color: "#666",
                                    lineHeight: "1.5",
                                    margin: 0
                                },
                                children: a.descricao
                            })]
                        })]
                    }, i))
                })]
            })]
        })]
    })
}
export {c as default};

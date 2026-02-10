import {u as A, r as h, l as P, j as e, L as x} from "./index-Z_n8MByG.js";
import {A as H} from "./AdminSidebar-DpwmTKwH.js";
function N() {
    var b, S, z, T, w, k, C, R, I;
    const m = A()
      , [i,u] = h.useState(null)
      , [o,y] = h.useState(null)
      , [l,j] = h.useState("hoje");
    h.useEffect( () => {
        if (!localStorage.getItem("app_state")) {
            m("/painelad");
            return
        }
        v();
        const a = setInterval(v, 3e4);
        return () => clearInterval(a)
    }
    , [m]);
    const v = async () => {
        try {
            const a = await fetch("/api/db/painelad/dashboard", {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (a.status === 401) {
                localStorage.removeItem("user_id"),
                localStorage.removeItem("app_state"),
                localStorage.removeItem("form_key"),
                m("/painelad");
                return
            }
            const s = await a.json();
            P.log("Dados do dashboard:", s),
            s && s.vendasHoje && s.vendasSemana && s.estatisticas ? u(s) : (P.error("Dados do dashboard com estrutura inválida:", s),
            u(null))
        } catch {
            u(null)
        }
    }
      , c = t => t.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return e.jsxs("div", {
        style: {
            display: "flex",
            background: "#f8f9fa",
            minHeight: "100vh"
        },
        children: [e.jsx(H, {}), e.jsxs("div", {
            style: {
                marginLeft: "250px",
                flex: 1,
                padding: "32px"
            },
            children: [e.jsxs("div", {
                style: {
                    marginBottom: "32px"
                },
                children: [e.jsx("h1", {
                    style: {
                        fontSize: "32px",
                        fontWeight: "700",
                        color: "#1a1a1a",
                        margin: 0,
                        marginBottom: "8px"
                    },
                    children: "Dashboard"
                }), e.jsx("p", {
                    style: {
                        fontSize: "14px",
                        color: "#6c757d",
                        margin: 0
                    },
                    children: "Visão geral do desempenho da sua loja"
                })]
            }), i ? e.jsxs(e.Fragment, {
                children: [e.jsxs("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                        gap: "24px",
                        marginBottom: "32px"
                    },
                    children: [e.jsxs("div", {
                        style: {
                            background: "white",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                            border: "1px solid #e9ecef"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                display: "flex",
                                gap: "8px",
                                marginBottom: "24px",
                                background: "#f8f9fa",
                                padding: "4px",
                                borderRadius: "10px"
                            },
                            children: [e.jsxs("button", {
                                onClick: () => j("hoje"),
                                style: {
                                    flex: 1,
                                    padding: "10px 16px",
                                    background: l === "hoje" ? "#0066cc" : "transparent",
                                    color: l === "hoje" ? "white" : "#6c757d",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-calendar-day",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "HOJE"]
                            }), e.jsxs("button", {
                                onClick: () => j("completo"),
                                style: {
                                    flex: 1,
                                    padding: "10px 16px",
                                    background: l === "completo" ? "#0066cc" : "transparent",
                                    color: l === "completo" ? "white" : "#6c757d",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-clock-rotate-left",
                                    style: {
                                        marginRight: "6px"
                                    }
                                }), "COMPLETO"]
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "20px",
                                marginBottom: "20px"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Gerados"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "32px",
                                        fontWeight: "700",
                                        color: "#1a1a1a",
                                        lineHeight: 1
                                    },
                                    children: l === "hoje" ? i.vendasHoje.totalPedidos : ((b = i.historicoCompleto) == null ? void 0 : b.totalPedidos) || 0
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pagos"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "32px",
                                        fontWeight: "700",
                                        color: "#28a745",
                                        lineHeight: 1
                                    },
                                    children: l === "hoje" ? i.vendasHoje.pedidosPagos || 0 : ((S = i.historicoCompleto) == null ? void 0 : S.pedidosPagos) || 0
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pendentes"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "32px",
                                        fontWeight: "700",
                                        color: "#ffc107",
                                        lineHeight: 1
                                    },
                                    children: l === "hoje" ? i.vendasHoje.pedidosPendentes || 0 : ((z = i.historicoCompleto) == null ? void 0 : z.pedidosPendentes) || 0
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Conversão"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "32px",
                                        fontWeight: "700",
                                        color: "#6610f2",
                                        lineHeight: 1
                                    },
                                    children: [l === "hoje" ? ((T = i.conversao) == null ? void 0 : T.toFixed(1)) || "0.0" : ((k = (w = i.historicoCompleto) == null ? void 0 : w.conversao) == null ? void 0 : k.toFixed(1)) || "0.0", "%"]
                                })]
                            })]
                        }), e.jsx("div", {
                            style: {
                                height: "1px",
                                background: "linear-gradient(to right, transparent, #e9ecef 20%, #e9ecef 80%, transparent)",
                                margin: "24px 0"
                            }
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "20px"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Total Gerado"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        color: "#007bff",
                                        lineHeight: 1
                                    },
                                    children: ["R$ ", c(l === "hoje" ? i.vendasHoje.totalVendido : ((C = i.historicoCompleto) == null ? void 0 : C.total) || 0)]
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pago"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        color: "#28a745",
                                        lineHeight: 1
                                    },
                                    children: ["R$ ", c(l === "hoje" ? i.vendasHoje.totalPago : ((R = i.historicoCompleto) == null ? void 0 : R.totalPago) || 0)]
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pendente"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "22px",
                                        fontWeight: "700",
                                        color: "#ffc107",
                                        lineHeight: 1
                                    },
                                    children: ["R$ ", c(l === "hoje" ? i.vendasHoje.totalPendente : ((I = i.historicoCompleto) == null ? void 0 : I.totalPendente) || 0)]
                                })]
                            })]
                        })]
                    }), i.upsells && i.upsells.totalAtivas > 0 && e.jsxs("div", {
                        style: {
                            background: "white",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                            border: "1px solid #e9ecef"
                        },
                        children: [e.jsxs("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "24px"
                            },
                            children: [e.jsxs("div", {
                                children: [e.jsx("h2", {
                                    style: {
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        margin: 0,
                                        marginBottom: "4px"
                                    },
                                    children: "Upsells (Taxas)"
                                }), e.jsx("p", {
                                    style: {
                                        fontSize: "13px",
                                        color: "#6c757d",
                                        margin: 0
                                    },
                                    children: "Conversão de ofertas adicionais"
                                })]
                            }), e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#fff3cd",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-gift",
                                    style: {
                                        fontSize: "20px",
                                        color: "#ffc107"
                                    }
                                })
                            })]
                        }), e.jsxs("div", {
                            style: {
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "20px"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Total"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        color: "#1a1a1a",
                                        lineHeight: 1
                                    },
                                    children: i.upsells.totalAtivas
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pagos"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        color: "#28a745",
                                        lineHeight: 1
                                    },
                                    children: i.upsells.pagas
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Pendentes"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        color: "#ffc107",
                                        lineHeight: 1
                                    },
                                    children: i.upsells.pendentes
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    textAlign: "center"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "11px",
                                        color: "#6c757d",
                                        marginBottom: "8px",
                                        fontWeight: "600",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.5px"
                                    },
                                    children: "Conversão"
                                }), e.jsxs("div", {
                                    style: {
                                        fontSize: "28px",
                                        fontWeight: "700",
                                        color: "#6610f2",
                                        lineHeight: 1
                                    },
                                    children: [i.upsells.conversao.toFixed(1), "%"]
                                })]
                            })]
                        }), e.jsx("div", {
                            style: {
                                marginTop: "20px",
                                paddingTop: "20px",
                                borderTop: "1px solid #e9ecef"
                            },
                            children: e.jsxs(x, {
                                to: "/painelad/taxas",
                                style: {
                                    fontSize: "13px",
                                    color: "#0066cc",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontWeight: "500"
                                },
                                children: [e.jsx("i", {
                                    className: "fa-solid fa-cog"
                                }), "Configurar Taxas/Upsells"]
                            })
                        })]
                    }), i.ultimos10Dias && i.ultimos10Dias.length > 0 && ( () => {
                        const t = i.ultimos10Dias.slice(-7)
                          , a = Math.max(...t.map(n => n.faturamentoTotal || n.faturamento))
                          , s = 180
                          , p = 30;
                        return e.jsxs("div", {
                            style: {
                                background: "white",
                                padding: "28px",
                                borderRadius: "16px",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                border: "1px solid #e9ecef"
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "20px"
                                },
                                children: [e.jsx("h2", {
                                    style: {
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        margin: 0
                                    },
                                    children: "Últimos 7 Dias"
                                }), e.jsx("div", {
                                    style: {
                                        width: "40px",
                                        height: "40px",
                                        background: "#f0e7ff",
                                        borderRadius: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    children: e.jsx("i", {
                                        className: "fa-solid fa-chart-line",
                                        style: {
                                            fontSize: "18px",
                                            color: "#6610f2"
                                        }
                                    })
                                })]
                            }), e.jsxs("div", {
                                style: {
                                    position: "relative",
                                    height: `${s + p * 2}px`,
                                    padding: `${p}px 0`
                                },
                                children: [[0, .5, 1].map( (n, d) => e.jsx("div", {
                                    style: {
                                        position: "absolute",
                                        left: 0,
                                        right: 0,
                                        top: `${p + (1 - n) * s}px`,
                                        height: "1px",
                                        background: "#f0f0f0",
                                        zIndex: 0
                                    },
                                    children: e.jsxs("span", {
                                        style: {
                                            position: "absolute",
                                            left: "-30px",
                                            top: "-8px",
                                            fontSize: "10px",
                                            color: "#999",
                                            whiteSpace: "nowrap"
                                        },
                                        children: ["R$ ", c(a * n)]
                                    })
                                }, d)), e.jsxs("svg", {
                                    style: {
                                        position: "absolute",
                                        top: p,
                                        left: 0,
                                        width: "100%",
                                        height: s,
                                        zIndex: 1,
                                        overflow: "visible"
                                    },
                                    viewBox: `0 0 ${t.length * 100} ${s}`,
                                    preserveAspectRatio: "none",
                                    children: [e.jsx("polyline", {
                                        points: t.map( (n, d) => {
                                            const r = d * 100 + 50
                                              , g = n.faturamentoTotal || n.faturamento
                                              , f = s - (a > 0 ? g / a * s : 0);
                                            return `${r},${f}`
                                        }
                                        ).join(" "),
                                        fill: "none",
                                        stroke: "#3b82f6",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }), e.jsx("polyline", {
                                        points: t.map( (n, d) => {
                                            const r = d * 100 + 50
                                              , g = s - (a > 0 ? n.faturamento / a * s : 0);
                                            return `${r},${g}`
                                        }
                                        ).join(" "),
                                        fill: "none",
                                        stroke: "#28a745",
                                        strokeWidth: "2.5",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    })]
                                }), o && e.jsxs("div", {
                                    style: {
                                        position: "absolute",
                                        left: `${o.xPercent}%`,
                                        top: `${p + Math.min(o.yTotal, o.yPago) - 80}px`,
                                        transform: "translateX(-50%)",
                                        background: "rgba(0, 0, 0, 0.9)",
                                        color: "white",
                                        padding: "10px 12px",
                                        borderRadius: "6px",
                                        fontSize: "11px",
                                        whiteSpace: "nowrap",
                                        zIndex: 10,
                                        pointerEvents: "none",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            fontWeight: "600",
                                            marginBottom: "6px",
                                            fontSize: "12px"
                                        },
                                        children: o.dia
                                    }), e.jsxs("div", {
                                        style: {
                                            color: "#93c5fd",
                                            marginBottom: "3px"
                                        },
                                        children: ["Total: R$ ", c(o.valorTotal)]
                                    }), e.jsxs("div", {
                                        style: {
                                            color: "#86efac",
                                            marginBottom: "3px"
                                        },
                                        children: ["Pago: R$ ", c(o.valorPago)]
                                    }), e.jsxs("div", {
                                        style: {
                                            color: "#d1d5db",
                                            fontSize: "10px",
                                            marginTop: "4px",
                                            borderTop: "1px solid rgba(255,255,255,0.2)",
                                            paddingTop: "4px"
                                        },
                                        children: [o.pedidosTotal, " ", o.pedidosTotal === 1 ? "pedido" : "pedidos"]
                                    })]
                                }), t.map( (n, d) => {
                                    const r = (d + .5) / t.length * 100
                                      , g = n.faturamentoTotal || n.faturamento
                                      , f = s - (a > 0 ? g / a * s : 0)
                                      , W = s - (a > 0 ? n.faturamento / a * s : 0)
                                      , B = 100 / t.length;
                                    return e.jsxs("div", {
                                        children: [e.jsx("div", {
                                            onMouseEnter: () => y({
                                                xPercent: r,
                                                yTotal: f,
                                                yPago: W,
                                                dia: n.dia,
                                                tipo: "area",
                                                valorTotal: g,
                                                valorPago: n.faturamento,
                                                pedidosTotal: n.pedidosTotal || 0,
                                                pedidosPago: n.pedidos
                                            }),
                                            onMouseLeave: () => y(null),
                                            style: {
                                                position: "absolute",
                                                left: `${d * B}%`,
                                                top: 0,
                                                width: `${B}%`,
                                                height: "100%",
                                                cursor: "pointer",
                                                zIndex: 1
                                            }
                                        }), e.jsx("div", {
                                            style: {
                                                position: "absolute",
                                                left: `${r}%`,
                                                top: `${p + f}px`,
                                                width: (o == null ? void 0 : o.xPercent) === r ? "12px" : "8px",
                                                height: (o == null ? void 0 : o.xPercent) === r ? "12px" : "8px",
                                                background: "#3b82f6",
                                                border: "2px solid white",
                                                borderRadius: "50%",
                                                transform: "translate(-50%, -50%)",
                                                pointerEvents: "none",
                                                zIndex: (o == null ? void 0 : o.xPercent) === r ? 3 : 2,
                                                boxShadow: (o == null ? void 0 : o.xPercent) === r ? "0 4px 8px rgba(59, 130, 246, 0.5)" : "0 2px 4px rgba(59, 130, 246, 0.3)",
                                                transition: "all 0.2s ease"
                                            }
                                        }), e.jsx("div", {
                                            style: {
                                                position: "absolute",
                                                left: `${r}%`,
                                                top: `${p + W}px`,
                                                width: (o == null ? void 0 : o.xPercent) === r ? "12px" : "8px",
                                                height: (o == null ? void 0 : o.xPercent) === r ? "12px" : "8px",
                                                background: "#28a745",
                                                border: "2px solid white",
                                                borderRadius: "50%",
                                                transform: "translate(-50%, -50%)",
                                                pointerEvents: "none",
                                                zIndex: (o == null ? void 0 : o.xPercent) === r ? 3 : 2,
                                                boxShadow: (o == null ? void 0 : o.xPercent) === r ? "0 4px 8px rgba(40, 167, 69, 0.5)" : "0 2px 4px rgba(40, 167, 69, 0.3)",
                                                transition: "all 0.2s ease"
                                            }
                                        }), e.jsx("div", {
                                            style: {
                                                position: "absolute",
                                                left: `${r}%`,
                                                bottom: "0",
                                                transform: "translateX(-50%)",
                                                fontSize: "11px",
                                                fontWeight: "500",
                                                color: "#6c757d",
                                                textAlign: "center",
                                                pointerEvents: "none"
                                            },
                                            children: n.dia
                                        })]
                                    }, d)
                                }
                                )]
                            }), e.jsxs("div", {
                                style: {
                                    marginTop: "16px",
                                    paddingTop: "16px",
                                    borderTop: "1px solid #e9ecef",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "20px",
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                },
                                children: [e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            width: "20px",
                                            height: "3px",
                                            background: "#28a745",
                                            borderRadius: "2px"
                                        }
                                    }), e.jsx("span", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#6c757d"
                                        },
                                        children: "Pago"
                                    })]
                                }), e.jsxs("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px"
                                    },
                                    children: [e.jsx("div", {
                                        style: {
                                            width: "20px",
                                            height: "3px",
                                            background: "#3b82f6",
                                            borderRadius: "2px"
                                        }
                                    }), e.jsx("span", {
                                        style: {
                                            fontSize: "11px",
                                            color: "#6c757d"
                                        },
                                        children: "Total"
                                    })]
                                })]
                            })]
                        })
                    }
                    )()]
                }), e.jsxs("div", {
                    style: {
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "24px",
                        marginBottom: "32px"
                    },
                    children: [e.jsx("div", {
                        style: {
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                            color: "white",
                            position: "relative",
                            overflow: "hidden"
                        },
                        children: e.jsxs("div", {
                            style: {
                                position: "relative",
                                zIndex: 1
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "16px"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        width: "48px",
                                        height: "48px",
                                        background: "rgba(255, 255, 255, 0.2)",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    children: e.jsx("i", {
                                        className: "fa-solid fa-box",
                                        style: {
                                            fontSize: "24px"
                                        }
                                    })
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "14px",
                                            opacity: .9,
                                            marginBottom: "4px"
                                        },
                                        children: "Produtos"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "36px",
                                            fontWeight: "700",
                                            lineHeight: 1
                                        },
                                        children: i.estatisticas.totalProdutos
                                    })]
                                })]
                            }), e.jsxs(x, {
                                to: "/painelad/produtos",
                                style: {
                                    fontSize: "13px",
                                    color: "white",
                                    textDecoration: "none",
                                    opacity: .9,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: ["Ver produtos", e.jsx("i", {
                                    className: "fa-solid fa-arrow-right",
                                    style: {
                                        fontSize: "12px"
                                    }
                                })]
                            })]
                        })
                    }), e.jsx("div", {
                        style: {
                            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 10px 30px rgba(245, 87, 108, 0.3)",
                            color: "white",
                            position: "relative",
                            overflow: "hidden"
                        },
                        children: e.jsxs("div", {
                            style: {
                                position: "relative",
                                zIndex: 1
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "16px"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        width: "48px",
                                        height: "48px",
                                        background: "rgba(255, 255, 255, 0.2)",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    children: e.jsx("i", {
                                        className: "fa-solid fa-tags",
                                        style: {
                                            fontSize: "24px"
                                        }
                                    })
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "14px",
                                            opacity: .9,
                                            marginBottom: "4px"
                                        },
                                        children: "Categorias"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "36px",
                                            fontWeight: "700",
                                            lineHeight: 1
                                        },
                                        children: i.estatisticas.totalCategorias
                                    })]
                                })]
                            }), e.jsxs(x, {
                                to: "/painelad/categorias",
                                style: {
                                    fontSize: "13px",
                                    color: "white",
                                    textDecoration: "none",
                                    opacity: .9,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                },
                                children: ["Ver categorias", e.jsx("i", {
                                    className: "fa-solid fa-arrow-right",
                                    style: {
                                        fontSize: "12px"
                                    }
                                })]
                            })]
                        })
                    }), e.jsx("div", {
                        style: {
                            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                            padding: "28px",
                            borderRadius: "16px",
                            boxShadow: "0 10px 30px rgba(250, 112, 154, 0.3)",
                            color: "white",
                            position: "relative",
                            overflow: "hidden"
                        },
                        children: e.jsxs("div", {
                            style: {
                                position: "relative",
                                zIndex: 1
                            },
                            children: [e.jsxs("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "16px"
                                },
                                children: [e.jsx("div", {
                                    style: {
                                        width: "48px",
                                        height: "48px",
                                        background: "rgba(255, 255, 255, 0.2)",
                                        borderRadius: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    children: e.jsx("i", {
                                        className: "fa-solid fa-star",
                                        style: {
                                            fontSize: "24px"
                                        }
                                    })
                                }), e.jsxs("div", {
                                    children: [e.jsx("div", {
                                        style: {
                                            fontSize: "14px",
                                            opacity: .9,
                                            marginBottom: "4px"
                                        },
                                        children: "Avaliações"
                                    }), e.jsx("div", {
                                        style: {
                                            fontSize: "36px",
                                            fontWeight: "700",
                                            lineHeight: 1
                                        },
                                        children: i.estatisticas.totalAvaliacoes
                                    })]
                                })]
                            }), e.jsx("div", {
                                style: {
                                    fontSize: "13px",
                                    opacity: .9
                                },
                                children: "Feedback dos clientes"
                            })]
                        })
                    })]
                }), e.jsxs("div", {
                    style: {
                        background: "white",
                        padding: "28px",
                        borderRadius: "16px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                        border: "1px solid #e9ecef"
                    },
                    children: [e.jsx("h2", {
                        style: {
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "#1a1a1a",
                            margin: 0,
                            marginBottom: "20px"
                        },
                        children: "Ações Rápidas"
                    }), e.jsxs("div", {
                        style: {
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "16px"
                        },
                        children: [e.jsxs(x, {
                            to: "/painelad/vendas",
                            style: {
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s",
                                border: "2px solid transparent"
                            },
                            onMouseOver: t => {
                                t.currentTarget.style.background = "#e7f3ff",
                                t.currentTarget.style.borderColor = "#0066cc"
                            }
                            ,
                            onMouseOut: t => {
                                t.currentTarget.style.background = "#f8f9fa",
                                t.currentTarget.style.borderColor = "transparent"
                            }
                            ,
                            children: [e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#007bff",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-shopping-cart",
                                    style: {
                                        fontSize: "20px",
                                        color: "white"
                                    }
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "4px"
                                    },
                                    children: "Ver Pedidos"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6c757d"
                                    },
                                    children: "Gerenciar vendas"
                                })]
                            })]
                        }), e.jsxs(x, {
                            to: "/painelad/carrinhos-abandonados",
                            style: {
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s",
                                border: "2px solid transparent"
                            },
                            onMouseOver: t => {
                                t.currentTarget.style.background = "#fff3cd",
                                t.currentTarget.style.borderColor = "#ffc107"
                            }
                            ,
                            onMouseOut: t => {
                                t.currentTarget.style.background = "#f8f9fa",
                                t.currentTarget.style.borderColor = "transparent"
                            }
                            ,
                            children: [e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#ffc107",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-cart-arrow-down",
                                    style: {
                                        fontSize: "20px",
                                        color: "white"
                                    }
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "4px"
                                    },
                                    children: "Carrinhos Abandonados"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6c757d"
                                    },
                                    children: "Recuperar vendas"
                                })]
                            })]
                        }), e.jsxs(x, {
                            to: "/painelad/produtos/novo",
                            style: {
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s",
                                border: "2px solid transparent"
                            },
                            onMouseOver: t => {
                                t.currentTarget.style.background = "#d4edda",
                                t.currentTarget.style.borderColor = "#28a745"
                            }
                            ,
                            onMouseOut: t => {
                                t.currentTarget.style.background = "#f8f9fa",
                                t.currentTarget.style.borderColor = "transparent"
                            }
                            ,
                            children: [e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#28a745",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-plus",
                                    style: {
                                        fontSize: "20px",
                                        color: "white"
                                    }
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "4px"
                                    },
                                    children: "Novo Produto"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6c757d"
                                    },
                                    children: "Adicionar ao catálogo"
                                })]
                            })]
                        }), e.jsx("div", {
                            style: {
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                border: "2px solid transparent",
                                opacity: 0.8
                            },
                            children: [e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#6c757d",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-ban",
                                    style: {
                                        fontSize: "20px",
                                        color: "white"
                                    }
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#6c757d",
                                        marginBottom: "4px"
                                    },
                                    children: "Área desativada"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6c757d"
                                    },
                                    children: "Recurso removido"
                                })]
                            })]
                        }), e.jsxs(x, {
                            to: "/painelad/taxas",
                            style: {
                                padding: "20px",
                                background: "#f8f9fa",
                                borderRadius: "12px",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                transition: "all 0.2s",
                                border: "2px solid transparent"
                            },
                            onMouseOver: t => {
                                t.currentTarget.style.background = "#fff3cd",
                                t.currentTarget.style.borderColor = "#ffc107"
                            }
                            ,
                            onMouseOut: t => {
                                t.currentTarget.style.background = "#f8f9fa",
                                t.currentTarget.style.borderColor = "transparent"
                            }
                            ,
                            children: [e.jsx("div", {
                                style: {
                                    width: "48px",
                                    height: "48px",
                                    background: "#ffc107",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                },
                                children: e.jsx("i", {
                                    className: "fa-solid fa-receipt",
                                    style: {
                                        fontSize: "20px",
                                        color: "white"
                                    }
                                })
                            }), e.jsxs("div", {
                                children: [e.jsx("div", {
                                    style: {
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        color: "#1a1a1a",
                                        marginBottom: "4px"
                                    },
                                    children: "Taxas"
                                }), e.jsx("div", {
                                    style: {
                                        fontSize: "12px",
                                        color: "#6c757d"
                                    },
                                    children: "Configurar taxas globais"
                                })]
                            })]
                        })]
                    })]
                })]
            }) : e.jsxs("div", {
                style: {
                    textAlign: "center",
                    padding: "60px",
                    color: "#6c757d"
                },
                children: [e.jsx("i", {
                    className: "fa-solid fa-spinner fa-spin",
                    style: {
                        fontSize: "48px",
                        marginBottom: "16px"
                    }
                }), e.jsx("p", {
                    children: "Carregando dashboard..."
                })]
            })]
        })]
    })
}
export {N as default};

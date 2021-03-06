var vizuly = {
    version: "1.0",
    core: {},
    viz: {}
};
vizuly.viz.layout = {}, vizuly.viz.layout.CLUSTERED = "CLUSTERED", vizuly.viz.layout.STACKED = "STACKED", vizuly.viz.layout.OVERLAP = "OVERLAP", vizuly.viz.layout.STREAM = "STREAM", vizuly.svg = {}, vizuly.theme = {}, vizuly.skin = {}, vizuly.ui = {}, vizuly.core.component = function(t, e, l, n) {
    e.parent = t, e.properties = l, e.id = vizuly.core.util.guid(), e.selection = d3.select(t).append("div").attr("id", "div_" + e.id).style("width", "100%").style("height", "100%");
    var i = [];
    i.push("mouseover"), i.push("mouseout"), i.push("mousedown"), i.push("click"), i.push("dblclick"), i.push("touch"), i.push("zoom"), i.push("zoomstart"), i.push("zoomend"), i.push("initialize"), i.push("validate"), i.push("measure"), i.push("update"), Object.getOwnPropertyNames(l).forEach(function(t, e, l) {
        i.push(t + "_change")
    }), n && n.length > 0 && n.forEach(function(t) {
        i.push(t)
    }), e.dispatch = d3.dispatch.apply(this, i);
    var o = function() {
        return t = o, l = e, n = e.properties, Object.getOwnPropertyNames(n).forEach(function(e, i, o) {
            void 0 === l[e] && (l[e] = n[e], t[e] = function(n) {
                if (!arguments.length) return l[e];
                var i = l[e];
                return l[e] = n, l[e] !== i && l.dispatch[e + "_change"].apply(this, [l[e], i]), t
            })
        }), o;
        var t, l, n
    };
    return e.dispatch.component = o(), o.id = function() {
        return e.id
    }, o.selection = function() {
        return e.selection
    }, o.on = function(t, l) {
        return e.dispatch.on(t, l), o
    }, o.validate = function() {
        if (!t) {
            var t = [];
            if (Object.getOwnPropertyNames(l).forEach(function(l) {
                    !e[l] && Number(0 != e[l]) && t.push(l)
                }), t.length > 0) throw new Error("vizuly.core.util.component.validate(): " + t.concat() + " need to be declared");
            e.dispatch.validate()
        }
    }, e.dispatch.component
}, vizuly.core.util = {}, vizuly.core.util.size = function(t, e, l) {
    var n = {};
    return n.width = e - vizuly.core.util.measure(t.left, e) - vizuly.core.util.measure(t.right, e), n.height = l - vizuly.core.util.measure(t.top, l) - vizuly.core.util.measure(t.bottom, l), n.top = vizuly.core.util.measure(t.top, l), n.left = vizuly.core.util.measure(t.left, e), n.bottom = vizuly.core.util.measure(t.bottom, l), n.right = vizuly.core.util.measure(t.right, e), n
}, vizuly.core.util.getTypedScale = function(t) {
    return "string" == typeof t ? d3.scale.ordinal() : t instanceof Date ? d3.time.scale() : d3.scale.linear()
}, vizuly.core.util.setRange = function(t, e, l) {
    "string" == typeof t.domain()[0] ? t.rangeBands([e, l], 0) : t.range([e, l])
}, vizuly.core.util.measure = function(t, e) {
    if ("string" == typeof t && "%" == t.substr(t.length - 1)) {
        var l = Math.min(Number(t.substr(0, t.length - 1)), 100) / 100;
        return Math.round(e * l)
    }
    return t
}, vizuly.core.util.guid = function() {
    return "vzxxxxxxxx".replace(/[xy]/g, function(t) {
        var e = 16 * Math.random() | 0;
        return ("x" === t ? e : 3 & e | 8).toString(16)
    })
}, vizuly.core.util.getDefs = function(t) {
    var e = t.selection().selectAll("svg defs");
    return e[0].length < 1 && (e = t.selection().select("svg").append("defs")), e
}, vizuly.core.util.createCSSKey = function(t) {
    return "css" + (t = (t = String(t).replace(",", "_")).replace(/[\s+,'+,\.,\(,\),\"]/g, "")).toUpperCase()
}, vizuly.core.util.aggregateNest = function(t, e, l) {
    function n(t, e) {
        if (e)
            for (var l = 0; l < o.length; l++) {
                var n = o[l];
                void 0 != t[n] && (t["childProp_" + n] = t[n]), e["childProp_" + n] = t["childProp_" + n] ? t["childProp_" + n] : t[n]
            }
    }
    for (var i = t[0]; i.values;) i = i.values[0];
    var o = [];
    Object.getOwnPropertyNames(i).forEach(function(t) {
        o.push(t)
    }),
        function t(i, o) {
            for (var r = 0; r < i.length; r++) {
                var a = i[r];
                if (a.values) {
                    t(a.values, a);
                    for (var s = 0; s < a.values.length; s++)
                        for (var c = a.values[s], u = 0; u < e.length; u++) isNaN(a["agg_" + e[u]]) && (a["agg_" + e[u]] = 0), a["agg_" + e[u]] = l(a["agg_" + e[u]], c["agg_" + e[u]])
                } else
                    for (u = 0; u < e.length; u++) a["agg_" + e[u]] = Number(a[e[u]]), isNaN(a["agg_" + e[u]]) && (a["agg_" + e[u]] = 0);
                n(a, o)
            }
        }(t)
}, vizuly.core.util.format_YEAR_Mon_MonDay = d3.time.format.multi([
    [".%L", function(t) {
        return t.getMilliseconds()
    }],
    [":%S", function(t) {
        return t.getSeconds()
    }],
    ["%I:%M", function(t) {
        return t.getMinutes()
    }],
    ["%I %p", function(t) {
        return t.getHours()
    }],
    ["%a %d", function(t) {
        return t.getDay() && 1 != t.getDate()
    }],
    ["%b %d", function(t) {
        return 1 != t.getDate()
    }],
    ["%b", function(t) {
        return t.getMonth()
    }],
    ["20%y", function(t) {
        return !0
    }]
]), vizuly.svg.filter = {}, vizuly.svg.filter.dropShadow = function(t, e, l, n) {
    var i = Math.round(100 * e) + "_" + Math.round(100 * l) + "_" + Math.round(100 * n),
        o = t.id(),
        r = vizuly.core.util.getDefs(t).selectAll("#vz_filter_" + o + "_" + i).data([i]).enter().append("filter").attr("id", "vz_filter_" + o + "_" + i).attr("class", "vz-svg-filter-dropShadow").attr("width", "300%").attr("height", "300%");
    r.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", n), r.append("feOffset").attr("dx", e).attr("dy", l), r.append("feComponentTransfer").append("feFuncA").attr("type", "linear").attr("slope", .2);
    var a = r.append("feMerge");
    return a.append("feMergeNode"), a.append("feMergeNode").attr("in", "SourceGraphic"), "#vz_filter_" + o + "_" + i
}, vizuly.svg.gradient = {}, vizuly.svg.gradient.blend = function(t, e, l, n) {
    var i, o, r, a, s = String(e).replace("#", "") + String(l).replace("#", ""),
        c = "vz_gradient_blend_" + t.id() + "_" + s;
    "horizontal" == n ? (i = "100%", o = "0%", r = "0%", a = "0%") : (i = "0%", o = "0%", r = "100%", a = "0%");
    var u = vizuly.core.util.getDefs(t),
        f = u.selectAll("#" + c).data([s]).enter().append("linearGradient").attr("id", c).attr("class", "vz-svg-gradient-blend").attr("x1", i).attr("x2", o).attr("y1", r).attr("y2", a);
    return f.append("stop").attr("offset", "0%").attr("stop-color", e), f.append("stop").attr("offset", "100%").attr("stop-color", l), u.selectAll("#" + c)
}, vizuly.svg.gradient.fade = function(t, e, l, n, i) {
    i || (i = [0, 1]), n || (n = [.75, .9]);
    var o, r, a, s, c = String(e).replace("#", ""),
        u = "vz_gradient_fade_" + t.id() + "_" + c;
    "horizontal" == l ? (o = "0%", r = "100%", a = "0%", s = "0%") : (o = "0%", r = "0%", a = "100%", s = "0%");
    var f = vizuly.core.util.getDefs(t),
        y = f.selectAll("#" + u).data([c]).enter().append("linearGradient").attr("id", u).attr("class", "vz-svg-gradient-fade").attr("x1", o).attr("x2", r).attr("y1", a).attr("y2", s);
    return y.append("stop").attr("offset", 100 * i[0] + "%").attr("stop-color", e).attr("stop-opacity", n[0]), y.append("stop").attr("offset", 100 * i[1] + "%").attr("stop-color", e).attr("stop-opacity", n[1]), f.selectAll("#" + u)
}, vizuly.svg.gradient.radialFade = function(t, e, l, n) {
    n || (n = [0, 1]), l || (l = [.75, .9]);
    var i = String(e).replace("#", ""),
        o = "vz_gradient_radial_fade" + t.id() + "_" + i,
        r = vizuly.core.util.getDefs(t),
        a = r.selectAll("#" + o).data([i]).enter().append("radialGradient").attr("id", o).attr("class", "vz-svg-gradient-radial-fade");
    return a.append("stop").attr("offset", 100 * n[0] + "%").attr("stop-color", e).attr("stop-opacity", l[0]), a.append("stop").attr("offset", 100 * n[1] + "%").attr("stop-color", e).attr("stop-opacity", l[1]), r.selectAll("#" + o)
}, vizuly.svg.gradient.darker = function(t, e, l) {
    var n, i, o, r, a = String(e).replace("#", ""),
        s = "vz_gradient_darker_" + t.id() + "_" + a;
    "horizontal" == l ? (n = "100%", i = "0%", o = "0%", r = "0%") : (n = "0%", i = "0%", o = "100%", r = "0%");
    var c = vizuly.core.util.getDefs(t),
        u = c.selectAll("#" + s).data([a]).enter().append("linearGradient").attr("class", "vz-gradient-darker").attr("id", s).attr("x1", n).attr("x2", i).attr("y1", o).attr("y2", r);
    return u.append("stop").attr("offset", "0%").attr("stop-color", e).attr("stop-opacity", .75), u.append("stop").attr("offset", "100%").attr("stop-color", d3.rgb(e).darker()).attr("stop-opacity", .9), c.selectAll("#" + s)
}, vizuly.svg.text = {}, vizuly.svg.text.arcPath = function(t, e) {
    var l = {};
    l.angle = e, l.startAngle = l.angle - 179 * .0174533, l.endAngle = l.angle + 179 * .0174533;
    var n = d3.svg.arc().innerRadius(t).outerRadius(t)(l),
        i = /[Mm][\d\.\-e,\s]+[Aa][\d\.\-e,\s]+/.exec(n);
    return i && (i = i[0]), i
}, vizuly.svg.text.wrap = function(t, e, l, n) {
    n = !n && t.attr("width") ? Number(t.attr("width")) : n, t.each(function() {
        var t = d3.select(this);
        t.selectAll("tspan").remove();
        var i, o = e.split(/\s+/).reverse(),
            r = [],
            a = t.attr("x"),
            s = t.attr("y"),
            c = parseFloat(l);
        isNaN(c) && (c = 0);
        for (var u = t.text(null).append("tspan").attr("x", a).attr("y", s).attr("dy", "0px"); i = o.pop();) r.push(i), u.text(r.join(" ")), u.node().getComputedTextLength() > n && (r.pop(), u.text(r.join(" ")), r = [i], u = t.append("tspan").attr("class", "vz-multi-line").attr("x", a).attr("y", s).attr("dy", +c + "px").text(i), c += l)
    })
}, vizuly.skin.COLUMNBAR_AXIIS = "Axiis", vizuly.skin.COLUMNBAR_NEON = "Neon", vizuly.skin.COLUMNBAR_MATERIALBLUE = "MaterialBlue", vizuly.skin.COLUMNBAR_MATERIALPINK = "MaterialPink", vizuly.theme.column_bar = function(t) {
    function e() {
        i(), "viz.chart.column" == t.type ? (o = ".vz-left-axis", r = ".vz-bottom-axis") : (r = ".vz-left-axis", o = ".vz-bottom-axis")
    }

    function l() {
        var e = t.width(),
            l = t.selection();
        a = Math.max(8, Math.round(t.width() / 65)), l.attr("class", f.class), l.selectAll(r + " .tick text").style("font-weight", f.ordinalAxis_font_weight).style("fill", f.labelColor).style("fill-opacity", 1).style("font-size", a + "px").style("opacity", function() {
            return e > 399 ? 1 : 0
        }), l.selectAll(o + " line").style("stroke", f.valueAxis_line_stroke).style("stroke-width", 1).style("opacity", f.valueAxis_line_opacity), l.selectAll(o + " text").style("font-size", a + "px").style("fill", f.labelColor).style("fill-opacity", .8);
        var n = l.selectAll(".vz-plot .vz-bar").style("stroke", "#FFF");
        t.layout() == vizuly.viz.layout.STACKED ? n.style("stroke-opacity", 1).style("stroke-width", function() {
            return e / 800 + "px"
        }).style("stroke-opacity", .6) : n.style("stroke-opacity", f.bar_stroke_opacity), l.selectAll(".vz-bar-group")[0].forEach(function(t, e) {
            d3.select(t).selectAll("rect.vz-bar").attr("filter", function(t, e) {
                return f.bar_filter(t, e)
            }).style("fill-opacity", function(t, e) {
                return f.bar_fill_opacity(t, e)
            }).style("fill", function(t, e) {
                return "new" == t.type ? "#00FF00" : "old" == t.type ? "#F00000" : "#02C3FF"
            }).style("rx", f.barRadius)
        }), f.background_transition()
    }

    function n(e) {
        return (o = ".vz-left-axis") ? t.xScale().domain().indexOf(t.y().apply(this, [e])) : t.yScale().domain().indexOf(t.x().apply(this, [e]))
    }

    function i() {
        c.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }
    var o, r, a, s = {
            MaterialBlue: {
                name: "Material Blue",
                labelColor: "#FFF",
                color: "#02C3FF",
                grad0: "#021F51",
                grad1: "#039FDB",
                background_transition: function() {
                    t.selection().selectAll(".vz-background").style("fill-opacity", 1), t.selection().selectAll(".vz-background").attr("fill", function() {
                        return "url(#" + u.attr("id") + ")"
                    }), u.selectAll("stop").transition().duration(500).attr("stop-color", function(t, e) {
                        return 0 == e ? f.grad0 : f.grad1
                    })
                },
                bar_filter: function(e, l) {
                    return n = t.width(), "url(" + vizuly.svg.filter.dropShadow(t, n / 300, n / 300, n / 200) + ")";
                    var n
                },
                bar_filter_over: function(e, l) {
                    return n = t.width(), "url(" + vizuly.svg.filter.dropShadow(t, n / 100, n / 100, 1.5) + ")";
                    var n
                },
                bar_fill: function(t, e) {
                    return "new" == t.type ? "#00FF00" : "old" == t.type ? "#F00000" : "#02C3FF"
                },
                bar_fill_opacity: function(t, e) {
                    return 1 - e / 4
                },
                bar_mouseover_stroke: "#02C3FF",
                bar_mouseover_fill: "#FFF",
                bar_stroke_opacity: 0,
                bar_mouseover_opacity: 1,
                ordinalAxis_font_weight: 200,
                valueAxis_line_stroke: "#FFF",
                valueAxis_line_opacity: .25,
                barRadius: function() {
                    return 0
                },
                datatip_class: "vz-material-datatip",
                class: "vz-skin-default"
            }
        },
        c = (t = t, [{
            on: "measure.theme",
            callback: function() {
                t.selection().selectAll(".vz-tip").remove(), "viz.chart.column" == t.type ? t.yAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).width).ticks(5).orient("left") : t.xAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).height).ticks(5)
            }
        }, {
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(e, l, i) {
                d3.select(e).style("fill", f.bar_mouseover_fill).style("fill-opacity", f.bar_mouseover_opacity).style("stroke", f.bar_mouseover_stroke).attr("filter", f.bar_filter_over()), d3.select(t.selection().selectAll(r + " .tick text")[0][n(l)]).transition().style("font-size", 1.2 * a + "px").style("font-weight", 700).style("fill", f.color).style("text-decoration", "underline").style("fill-opacity", 1).style("opacity", 1)
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, i) {
                d3.select(e).style("fill", function() {
                    return f.bar_fill(l, i)
                }).style("fill-opacity", function() {
                    return f.bar_fill_opacity(l, i)
                }).style("stroke", "#FFF").attr("filter", f.bar_filter()), d3.select(t.selection().selectAll(r + " .tick text")[0][n(l)]).transition().style("font-size", a + "px").style("fill", f.labelColor).style("font-weight", f.ordinalAxis_font_weight).style("text-decoration", null).style("fill-opacity", 1).style("opacity", function() {
                    return t.width() > 399 ? 1 : 0
                })
            }
        }]);
    e();
    var u = vizuly.svg.gradient.blend(t, "#000", "#000");
    e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), c.forEach(function(e) {
            t.on(e.on, null)
        }), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t = e, void i()) : t
    };
    var f = null;
    return e.skin = function(t) {
        if (0 == arguments.length) return f;
        if (!s[t]) throw new Error("theme/column_bar.js - skin " + t + " does not exist.");
        return f = s[t], e
    }, e.skins = function() {
        return s
    }, e
}, vizuly.skin.LINEAREA_AXIIS = "Axiis", vizuly.skin.LINEAREA_NEON = "Neon", vizuly.skin.LINEAREA_FIRE = "Fire", vizuly.skin.LINEAREA_OCEAN = "Ocean", vizuly.skin.LINEAREA_SUNSET = "Sunset", vizuly.skin.LINEAREA_BUSINESS = "Business", vizuly.theme.radial_linearea = function(t) {
    function e() {
        i()
    }

    function l() {
        if (o) {
            var e = t.selection();
            e.attr("class", o.class), e.selectAll(".vz-background").attr("fill", function() {
                return "url(#" + r.attr("id") + ")"
            }), e.selectAll(".vz-plot-background").style("opacity", 0), e.selectAll(".vz-area").style("fill", function(t, e) {
                return o.area_fill(t, e)
            }).style("fill-opacity", function(e, l) {
                return o.area_fill_opacity.apply(t, [e, l])
            }), e.selectAll(".vz-line").style("stroke-width", function() {
                return t.outerRadius() / 450
            }).style("stroke", function(t, e) {
                return o.line_stroke(t, e)
            }).style("opacity", function(e, l) {
                return o.line_opacity.apply(t, [e, l])
            }), e.selectAll(".vz-data-point").style("opacity", 0), e.selectAll(".vz-radial-x-axis-tick").style("font-weight", o.xAxis_font_weight).style("fill", o.labelColor).style("font-weight", 300).style("fill-opacity", .4).style("font-size", Math.max(8, Math.round(t.outerRadius() / 25)) + "px"), e.selectAll(".vz-y-axis-tick").style("stroke", o.yAxis_line_stroke).style("stroke-width", 1).style("opacity", o.yAxis_line_opacity), e.selectAll(".vz-y-axis-tick-label").style("font-size", Math.max(8, Math.round(t.outerRadius() / 30)) + "px").style("fill", o.labelColor).style("font-weight", 200).style("fill-opacity", function() {
                return o === c.Business ? 1 : .4
            }), o.background_transition()
        }
    }

    function n() {
        t.selection().selectAll(".vz-background").style("fill-opacity", 1), r.selectAll("stop").transition().duration(500).attr("stop-color", function(t, e) {
            return 0 == e ? o.grad0 : o.grad1
        })
    }

    function i() {
        s.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }
    t = t;
    var o = null,
        r = vizuly.svg.gradient.blend(t, "#000", "#000"),
        a = d3.scale.category20(),
        s = [{
            on: "measure.theme",
            callback: function() {
                t.yAxis().tickSize(t.outerRadius()).ticks(t.layout() == vizuly.viz.layout.OVERLAP ? 5 : 7).orient("left")
            }
        }, {
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-line").transition().style("stroke-width", function() {
                    return t.outerRadius() / 270
                }).style("stroke", function(t, e) {
                    return o.line_over_stroke(t, e)
                }).style("opacity", function(t, e) {
                    return e == n ? 1 : 0
                }), t.selection().selectAll(".vz-area").transition().style("opacity", function(t, e) {
                    return e == n ? 1 : .35
                }), t.selection().selectAll(".vz-plot").append("circle").attr("class", "vz-yAxis-mouseover").attr("cx", 0).attr("cy", 0).attr("r", function() {
                    return t.radiusScale()(e.y + e.y0)
                }).style("stroke", "#FFF").style("fill", "none").style("stroke-dasharray", function() {
                    return t.outerRadius() / 80 + "," + t.outerRadius() / 80
                }), t.selection().selectAll(".vz-y-axis-tick").style("opacity", .1), t.selection().selectAll(".vz-point-tip").remove(), d3.select(this).append("circle").attr("class", "vz-point-tip").attr("r", 4).style("fill", "#000").style("stroke", "#FFF").style("stroke-width", 2).style("pointer-events", "none")
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-line").transition().style("stroke-width", function() {
                    return t.outerRadius() / 450
                }).style("stroke", function(t, e) {
                    return o.line_stroke(t, e)
                }).style("opacity", function(e, l) {
                    return o.line_opacity.apply(t, [e, l])
                }), t.selection().selectAll(".vz-area").transition().style("opacity", 1), t.selection().selectAll(".vz-yAxis-mouseover").remove(), t.selection().selectAll(".vz-point-tip").remove(), t.selection().selectAll(".vz-y-axis-tick").style("opacity", o.yAxis_line_opacity)
            }
        }];
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), s.forEach(function(e) {
            t.on(e.on, null)
        }), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t = e, void i()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return o;
        if (!c[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return o = c[t], e
    }, e.skins = function() {
        return c
    };
    var c = {
        Fire: {
            name: "Fire",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            line_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            line_over_stroke: function(t, e) {
                return d3.rgb(this.stroke_colors[e % 5]).brighter()
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .4 : .6
            },
            area_fill: function(e, l) {
                return "url(#" + vizuly.svg.gradient.radialFade(t, this.fill_colors[l % 5], [1, .35]).attr("id") + ")"
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .7 : .9
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        },
        Sunset: {
            name: "Sunset",
            labelColor: "#D8F433",
            color: "#02C3FF",
            stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"],
            fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"],
            grad1: "#7D1439",
            grad0: "#000",
            background_transition: n,
            line_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            line_over_stroke: function(t, e) {
                return d3.rgb(this.stroke_colors[e % 5]).brighter()
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .4 : .9
            },
            area_fill: function(e, l) {
                return "url(#" + vizuly.svg.gradient.radialFade(t, this.fill_colors[l % 5], [1, .35]).attr("id") + ")"
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .8 : 1
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#D8F433",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        },
        Ocean: {
            name: "Ocean",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#001432", "#001432", "#001432", "#001432", "#001432"],
            grad1: "#390E1D",
            grad0: "#92203A",
            background_transition: function(e) {
                t.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0)
            },
            line_stroke: function(t, e) {
                return "#FFF"
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return .3
            },
            area_fill: function(e, l) {
                return "url(#" + vizuly.svg.gradient.radialFade(t, "#FFF", [1, .35]).attr("id") + ")"
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .2 : .7
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            class: "vz-skin-ocean"
        },
        Neon: {
            name: "Neon",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            line_stroke: function(t, e) {
                return "#FFF"
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .2 : .4
            },
            area_fill: function(t, e) {
                return "#D1F704"
            },
            area_fill_opacity: function(e, l) {
                var n = d3.scale.linear().range([.1, .8]).domain([0, t.data().length])(l);
                return this.layout() == vizuly.viz.layout.OVERLAP ? .8 * n : n
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        },
        Business: {
            name: "Business",
            labelColor: "#000",
            color: "#000",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#CCC",
            grad1: "#CCC",
            background_transition: n,
            line_stroke: function(t, e) {
                return d3.rgb(a(e)).darker()
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return .7
            },
            area_fill: function(t, e) {
                return a(e)
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .9 : .95
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#000",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        }
    };
    return e
}, vizuly.skin.HALO_FIRE = "Fire", vizuly.skin.HALO_SUNSET = "Sunset", vizuly.skin.HALO_NEON = "Neon", vizuly.skin.HALO_OCEAN = "Ocean", vizuly.theme.halo = function(t) {
    function e() {
        u()
    }

    function l() {
        if (f && t) {
            var e = t.selection();
            e.attr("class", f.class), e.selectAll(".vz-background").attr("fill", function() {
                return "url(#" + y.attr("id") + ")"
            }), e.selectAll(".vz-plot-background").style("opacity", 0), e.selectAll(".vz-halo-link-path").style("fill", function(t, e) {
                return f.link_fill(t, e)
            }).style("fill-opacity", f.link_fill_opacity).style("stroke", function(t, e) {
                return f.link_stroke(t, e)
            }), e.selectAll(".vz-halo-link-node").style("fill", function(t, e) {
                return f.link_fill(t, e)
            }).style("fill-opacity", f.link_node_fill_opacity), e.selectAll(".vz-halo-node").style("fill", function(t, e) {
                return f.node_fill(t, e)
            }).style("stroke", function(t, e) {
                return f.node_stroke(t, e)
            }).style("stroke-width", function(t, e) {
                return _(t.r)
            }), e.selectAll(".vz-halo-arc-slice").style("fill", function(t, e) {
                return f.arc_fill(t, e)
            }), e.selectAll(".vz-halo-arc").style("fill", function(t, e) {
                return f.arc_fill(t, e)
            }), f.background_transition()
        }
    }

    function n(e, l, n) {
        t.selection().selectAll(".vz-halo-arc").style("fill-opacity", null).style("stroke-opacity", null).style("fill", function(t, e) {
            return f.arc_fill(t, e)
        }), t.selection().selectAll(".vz-halo-node").style("fill-opacity", null).style("stroke-opacity", null).style("stroke", function(t, e) {
            return f.node_stroke(t, e)
        }), t.selection().selectAll(".vz-halo-link-node").style("fill-opacity", f.link_node_fill_opacity).style("stroke", null), t.selection().selectAll(".vz-halo-link-path").style("fill-opacity", f.link_fill_opacity).style("stroke-opacity", null), t.selection().selectAll(".vz-halo-arc-slice").style("fill-opacity", null).style("stroke-opacity", null)
    }

    function i() {
        t.selection().selectAll(".vz-halo-node").style("fill-opacity", .1).style("stroke-opacity", .05), t.selection().selectAll(".vz-halo-link-node").style("fill-opacity", 0), t.selection().selectAll(".vz-halo-link-path").style("fill-opacity", .025)
    }

    function o(t) {
        t.style("fill-opacity", .6).style("stroke-opacity", .25)
    }

    function r(t) {
        t.style("fill-opacity", .5).style("stroke-opacity", .7).style("stroke", function(t, e) {
            return f.node_over_stroke(t, e)
        })
    }

    function a(t) {
        t.style("fill-opacity", .8).style("stroke-opacity", .8)
    }

    function s(t) {
        t.style("fill-opacity", .65).style("stroke-opacity", .8).style("fill", function(t, e) {
            return f.arc_over_fill(t, e)
        })
    }

    function c() {
        t.selection().selectAll(".vz-background").style("fill-opacity", 1), y.selectAll("stop").transition().duration(500).attr("stop-color", function(t, e) {
            return 0 == e ? f.grad0 : f.grad1
        })
    }

    function u() {
        d.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }
    t = t;
    var f = null,
        y = vizuly.svg.gradient.blend(t, "#000", "#000"),
        _ = d3.scale.linear(),
        d = [{
            on: "measure.theme",
            callback: function() {
                var e = Math.min(t.width(), t.height() / 2);
                _.domain([0, e / 20]), _.range([0, e / 80])
            }
        }, {
            on: "update.theme",
            callback: l
        }, {
            on: "nodeover.theme",
            callback: function(e, l, n) {
                i();
                var c = t.selection().selectAll(".vz-halo-link-path.node-key_" + l.key);
                c.each(function(e) {
                    s(t.selection().selectAll(".vz-halo-arc.halo-key_" + t.haloKey()(e.data)))
                }), o(c), a(t.selection().selectAll(".vz-halo-arc-slice.node-key_" + l.key)), r(t.selection().selectAll(".vz-halo-node.node-key_" + l.key))
            }
        }, {
            on: "nodeout.theme",
            callback: n
        }, {
            on: "arcover.theme",
            callback: function(e, l, n) {
                i(), s(d3.select(e)), o(t.selection().selectAll(".vz-halo-link-path.halo-key_" + l.data.key)), l.data.values.forEach(function(e) {
                    t.selection().selectAll(".vz-halo-node.node-key_" + t.nodeKey()(e)).style("fill-opacity", .8).style("stroke-opacity", .5).style("stroke", function(t, e) {
                        return f.node_over_stroke(t, e)
                    })
                })
            }
        }, {
            on: "arcout.theme",
            callback: n
        }, {
            on: "linkover.theme",
            callback: function(e, l, n) {
                i(), o(d3.select(e.parentNode).selectAll(".vz-halo-link-path")), s(t.selection().selectAll(".vz-halo-arc.halo-key_" + t.haloKey()(l.data))), a(d3.select(e.parentNode).selectAll(".vz-halo-arc-slice")), t.selection().selectAll(".vz-halo-node.node-key_" + t.nodeKey()(l.data)).style("stroke-opacity", .8).style("stroke", function(t, e) {
                    return f.node_over_stroke(t, e)
                }), r(d3.select(e.parentNode).selectAll("circle"))
            }
        }, {
            on: "linkout.theme",
            callback: n
        }];
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), d.forEach(function(e) {
            t.on(e.on, null)
        }), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t = e, void u()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return f;
        if (!p[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return f = p[t], e
    }, e.skins = function() {
        return p
    };
    var p = {
        Fire: {
            name: "Fire",
            labelColor: "#FFF",
            labelFill: "#C50A0A",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: c,
            link_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            link_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            link_fill_opacity: .1,
            link_node_fill_opacity: .1,
            node_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            node_over_stroke: function(t, e) {
                return "#FFF"
            },
            node_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            arc_stroke: function(t, e) {
                return "#FFF"
            },
            arc_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            arc_over_fill: function(t, e) {
                return "#FFEB3B"
            },
            class: "vz-skin-fire"
        },
        Sunset: {
            name: "Sunset",
            labelColor: "#FFF",
            labelFill: "#00236C",
            stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"],
            fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"],
            grad0: "#220910",
            grad1: "#571825",
            background_transition: c,
            link_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            link_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            link_fill_opacity: .2,
            link_node_fill_opacity: .5,
            node_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            node_over_stroke: function(t, e) {
                return "#FFF"
            },
            node_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            arc_stroke: function(t, e) {
                return "#FFF"
            },
            arc_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            arc_over_fill: function(t, e) {
                return "#00236C"
            },
            class: "vz-skin-sunset"
        },
        Neon: {
            name: "Neon",
            labelColor: "#FFF",
            labelFill: "#005",
            grad0: "#000000",
            grad1: "#474747",
            background_transition: c,
            link_stroke: function(t, e) {
                return "#D1F704"
            },
            link_fill: function(t, e) {
                return "#D1F704"
            },
            link_fill_opacity: .1,
            link_node_fill_opacity: .1,
            node_stroke: function(t, e) {
                return "#D1F704"
            },
            node_over_stroke: function(t, e) {
                return "#FFF"
            },
            node_fill: function(t, e) {
                return "#FFF"
            },
            arc_stroke: function(t, e) {
                return "#FFF"
            },
            arc_fill: function(t, e) {
                return "#D1F704"
            },
            arc_over_fill: function(t, e) {
                return "#03F"
            },
            class: "vz-skin-neon"
        },
        Ocean: {
            name: "Ocean",
            labelColor: "#FFF",
            labelFill: "#000",
            background_transition: function(e) {
                t.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0)
            },
            link_stroke: function(t, e) {
                return "#FFF"
            },
            link_fill: function(t, e) {
                return "#FFF"
            },
            link_fill_opacity: .075,
            link_node_fill_opacity: .075,
            node_stroke: function(t, e) {
                return "#FFF"
            },
            node_over_stroke: function(t, e) {
                return "#FFF"
            },
            node_fill: function(t, e) {
                return "#FFF"
            },
            arc_stroke: function(t, e) {
                return "#FFF"
            },
            arc_fill: function(t, e) {
                return "#FFF"
            },
            arc_over_fill: function(t, e) {
                return "#000"
            },
            class: "vz-skin-ocean"
        }
    };
    return e
}, vizuly.skin.LINEAREA_AXIIS = "Axiis", vizuly.skin.LINEAREA_NEON = "Neon", vizuly.skin.LINEAREA_FIRE = "Fire", vizuly.skin.LINEAREA_OCEAN = "Ocean", vizuly.skin.LINEAREA_SUNSET = "Sunset", vizuly.skin.LINEAREA_BUSINESS = "Business", vizuly.theme.linearea = function(t) {
    function e() {
        i()
    }

    function l() {
        if (o && null != o) {
            var e = t.width(),
                l = t.height(),
                n = t.selection();
            n.attr("class", o.class), n.selectAll(".vz-background").attr("fill", function() {
                return "url(#" + r.attr("id") + ")"
            }), n.selectAll(".vz-plot-background").style("opacity", 0), n.selectAll(".vz-area").style("fill", function(t, e) {
                return o.area_fill(t, e)
            }).style("fill-opacity", function(e, l) {
                return o.area_fill_opacity.apply(t, [e, l])
            }), n.selectAll(".vz-line").style("stroke-width", function() {
                return l / 450
            }).style("stroke", function(t, e) {
                return o.line_stroke(t, e)
            }).style("opacity", function(e, l) {
                return o.line_opacity.apply(t, [e, l])
            }), n.selectAll(".vz-data-point").style("opacity", 0), n.selectAll(".vz-bottom-axis").style("font-weight", o.xAxis_font_weight).style("fill", o.labelColor).style("font-weight", 300).style("fill-opacity", .8).style("font-size", Math.max(8, Math.round(e / 65)) + "px").style("opacity", function() {
                return e > 399 ? 1 : 0
            }), n.selectAll(".vz-left-axis line").style("stroke", o.yAxis_line_stroke).style("stroke-width", 1).style("opacity", o.yAxis_line_opacity), n.selectAll(".vz-left-axis text").style("font-size", Math.max(8, Math.round(e / 65)) + "px").style("fill", o.labelColor).style("fill-opacity", .8), o.background_transition()
        }
    }

    function n() {
        t.selection().selectAll(".vz-background").style("fill-opacity", 1), r.selectAll("stop").transition().duration(500).attr("stop-color", function(t, e) {
            return 0 == e ? o.grad0 : o.grad1
        })
    }

    function i() {
        s.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }
    t = t;
    var o = null,
        r = vizuly.svg.gradient.blend(t, "#000", "#000"),
        a = d3.scale.category20(),
        s = [{
            on: "measure.theme",
            callback: function() {
                t.yAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).width).ticks(5).orient("left"), t.xAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).width)
            }
        }, {
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-line").transition().style("stroke", function(t, e) {
                    return o.line_over_stroke(t, e)
                }).style("opacity", function(t, e) {
                    return e == n ? 1 : 0
                }), t.selection().selectAll(".vz-area").transition().style("opacity", function(t, e) {
                    return e == n ? 1 : .35
                }), t.selection().selectAll(".vz-point-tip").remove(), d3.select(this).append("circle").attr("class", "vz-point-tip").attr("r", 4).style("fill", "#000").style("stroke", "#FFF").style("stroke-width", 2).style("pointer-events", "none")
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-line").transition().style("stroke", function(t, e) {
                    return o.line_stroke(t, e)
                }).style("opacity", function(e, l) {
                    return o.line_opacity.apply(t, [e, l])
                }), t.selection().selectAll(".vz-area").transition().style("opacity", 1), t.selection().selectAll(".vz-point-tip").remove()
            }
        }];
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), s.forEach(function(e) {
            t.on(e.on, null)
        }), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t = e, void i()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return o;
        if (!c[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return o = c[t], e
    }, e.skins = function() {
        return c
    };
    var c = {
        Fire: {
            name: "Fire",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            line_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            line_over_stroke: function(t, e) {
                return d3.rgb(this.stroke_colors[e % 5]).brighter()
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .6 : .8
            },
            area_fill: function(e, l) {
                return "url(#" + vizuly.svg.gradient.fade(t, this.fill_colors[l % 5], "vertical", [.35, 1]).attr("id") + ")"
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .7 : .9
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            data_point_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            data_point_fill: function(t, e) {
                return "#FFF"
            },
            class: "vz-skin-default"
        },
        Sunset: {
            name: "Sunset",
            labelColor: "#D8F433",
            color: "#02C3FF",
            stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"],
            fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"],
            grad1: "#390E1D",
            grad0: "#92203A",
            background_transition: n,
            line_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            line_over_stroke: function(t, e) {
                return d3.rgb(this.stroke_colors[e % 5]).brighter()
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .4 : .9
            },
            area_fill: function(e, l) {
                return "url(#" + vizuly.svg.gradient.fade(t, this.fill_colors[l % 5], "vertical", [.5, 1]).attr("id") + ")"
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .8 : 1
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#D8F433",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        },
        Ocean: {
            name: "Ocean",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#001432", "#001432", "#001432", "#001432", "#001432"],
            grad1: "#390E1D",
            grad0: "#92203A",
            background_transition: function(e) {
                t.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0)
            },
            line_stroke: function(t, e) {
                return "#000"
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return .3
            },
            area_fill: function(t, e) {
                return "#FFF"
            },
            area_fill_opacity: function(e, l) {
                return (l + 1) / t.data().length * (this.layout() == vizuly.viz.layout.OVERLAP ? .8 : .85)
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            class: "vz-skin-ocean"
        },
        Neon: {
            name: "Neon",
            labelColor: "#FFF",
            color: "#02C3FF",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            line_stroke: function(t, e) {
                return "#FFF"
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.STREAM ? .4 : .6
            },
            area_fill: function(t, e) {
                return "#D1F704"
            },
            area_fill_opacity: function(t, e) {
                return (e + 1) / this.data().length * (this.layout() == vizuly.viz.layout.OVERLAP ? .6 : .8)
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        },
        Business: {
            name: "Business",
            labelColor: "#000",
            color: "#000",
            stroke_colors: ["#FFA000", "#FF5722", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#CCC",
            grad1: "#EEE",
            background_transition: n,
            line_stroke: function(t, e) {
                return d3.rgb(a(e)).darker()
            },
            line_over_stroke: function(t, e) {
                return "#FFF"
            },
            line_opacity: function(t, e) {
                return .7
            },
            area_fill: function(t, e) {
                return a(e)
            },
            area_fill_opacity: function(t, e) {
                return this.layout() == vizuly.viz.layout.OVERLAP ? .8 : .9
            },
            xAxis_font_weight: 200,
            yAxis_line_stroke: "#000",
            yAxis_line_opacity: .25,
            class: "vz-skin-default"
        }
    };
    return e
}, vizuly.theme.radial_progress = function(t) {
    function e() {
        n()
    }

    function l() {
        if (a) {
            var e = t.selection();
            e.attr("class", a.class), e.selectAll(".vz-radial_progress-arc").style("fill", function(t, e) {
                return a.arc_fill(t, e)
            }).style("fill-opacity", function(t, e) {
                return a.arc_fill_opacity(t, e)
            }).style("stroke", function(t, e) {
                return a.arc_stroke(t, e)
            }), e.selectAll(".vz-radial_progress-track").style("fill", a.track_fill), e.selectAll(".vz-radial_progress-label").style("fill", a.label_color).style("stroke-opacity", 0).style("font-size", .25 * t.radius())
        }
    }

    function n() {
        r.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }

    function i() {
        r.forEach(function(e) {
            t.on(e.on, null)
        })
    }
    var o = {
            Alert: {
                name: "Alert",
                label_color: "#CCC",
                track_fill: "#DDDDDD",
                progress_colors: ["#4CAF50", "#FFC107", "#FF9800", "#E64A19", "#FFEB3B"],
                arc_fill: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                arc_fill_opacity: function(t, e) {
                    return 1
                },
                arc_stroke: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                class: "vz-skin-alert"
            },
            Fire: {
                name: "Fire",
                label_color: "#F13870",
                track_fill: "#DDDDDD",
                progress_colors: ["#C50A0A", "#F57C00", "#FF9800", "#FFEB3B", "#C2185B"],
                arc_fill: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                arc_fill_opacity: function(t, e) {
                    return 1
                },
                arc_stroke: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                class: "vz-skin-fire"
            },
            White: {
                name: "White",
                label_color: "#FFF",
                track_fill: null,
                arc_fill: function(t, e) {
                    return "#FFF"
                },
                arc_fill_opacity: function(t, e) {
                    return .85 / Math.exp(.75 * e)
                },
                arc_stroke: function(t, e) {
                    return "#FFF"
                },
                class: "vz-skin-white"
            },
            Neon: {
                name: "Neon",
                label_color: "#D1F704",
                track_fill: "#000",
                progress_colors: ["#D1F704", "#A8C102", "#788A04", "#566204", "#383F04"],
                arc_fill: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                arc_fill_opacity: function(t, e) {
                    return 1
                },
                arc_stroke: function(t, e) {
                    return this.progress_colors[e % 5]
                },
                class: "vz-skin-neon"
            },
            Business: {
                name: "Business",
                label_color: "#EEE",
                track_fill: "#DDDDDD",
                progress_colors: d3.scale.category20(),
                arc_fill: function(t, e) {
                    return this.progress_colors(e)
                },
                arc_fill_opacity: function(t, e) {
                    return 1
                },
                arc_stroke: function(t, e) {
                    return this.progress_colors(e)
                },
                class: "vz-skin-business"
            }
        },
        r = (t = t, [{
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-radial_progress-label").style("font-weight", 700)
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-radial_progress-label").style("font-weight", null)
            }
        }]);
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), i(), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t && i(), t = e, void n()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return a;
        if (!o[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return a = o[t], e
    }, e.skins = function() {
        return o
    };
    var a = o[vizuly.skin.RADIAL_PROGRESS_BUSINESS];
    return e
}, vizuly.skin.RADIAL_PROGRESS_FIRE = "Fire", vizuly.skin.RADIAL_PROGRESS_MATERIAL = "Material", vizuly.skin.RADIAL_PROGRESS_NEON = "Neon", vizuly.skin.RADIAL_PROGRESS_OCEAN = "Ocean", vizuly.skin.RADIAL_PROGRESS_ALERT = "Alert", vizuly.skin.RADIAL_PROGRESS_BUSINESS = "Business", vizuly.theme.range_input = function(t) {
    function e() {
        n()
    }

    function l() {
        if (a) {
            var e = t.selection();
            e.attr("class", a.class), e.selectAll(".vz-range_input-handle").style("cursor", "pointer"), e.selectAll(".vz-range_input-centerpane").style("cursor", "pointer"), e.selectAll(".vz-range_input-track").style("opacity", 0)
        }
    }

    function n() {
        r.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }

    function i() {
        r.forEach(function(e) {
            t.on(e.on, null)
        })
    }
    var o = {
            Default: {
                name: "Default",
                label_color: "#CCC"
            }
        },
        r = (t = t, [{
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(t, e, l) {}
        }, {
            on: "mouseout.theme",
            callback: function(t, e, l) {}
        }]);
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), i(), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t && i(), t = e, void n()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return a;
        if (!o[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return a = o[t], e
    }, e.skins = function() {
        return o
    };
    var a = o.Default;
    return e
}, vizuly.skin.SCATTER_NEON = "Neon", vizuly.skin.SCATTER_FIRE = "Fire", vizuly.skin.SCATTER_OCEAN = "Ocean", vizuly.skin.SCATTER_SUNSET = "Sunset", vizuly.skin.SCATTER_BUSINESS = "Business", vizuly.theme.scatter = function(t) {
    function e() {
        i()
    }

    function l() {
        if (o) {
            var e = t.width(),
                l = Math.min(t.width(), t.height()) / 80,
                n = t.selection();
            n.attr("class", o.class), n.selectAll(".vz-background").attr("fill", function() {
                return "url(#" + r.attr("id") + ")"
            }), n.selectAll(".vz-plot-background").style("opacity", 0), n.selectAll(".vz-scatter-bottom-axis").style("font-weight", o.xAxis_font_weight).style("fill", o.labelColor).style("font-size", Math.max(8, Math.round(e / 85)) + "px").style("opacity", function() {
                return e > 399 ? 1 : 0
            }), n.selectAll(".vz-scatter-left-axis line").style("stroke", o.yAxis_line_stroke).style("stroke-width", 1).style("opacity", o.yAxis_line_opacity), n.selectAll(".vz-scatter-left-axis text").style("font-size", Math.max(8, Math.round(e / 85)) + "px").style("fill", o.labelColor).style("fill-opacity", .6), n.selectAll(".vz-scatter-node").style("stroke-width", l).style("stroke-opacity", 0).style("stroke", function(t, e) {
                return o.node_stroke(t, e)
            }).style("fill", function(t, e) {
                return o.node_fill(t, e)
            }).style("fill-opacity", function(t, e) {
                return o.node_fill_opacity(t, e)
            }), o.background_transition()
        }
    }

    function n() {
        t.selection().selectAll(".vz-background").style("fill-opacity", 1), r.selectAll("stop").transition().duration(500).attr("stop-color", function(t, e) {
            return 0 == e ? o.grad0 : o.grad1
        })
    }

    function i() {
        a.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }
    t = t;
    var o = null,
        r = vizuly.svg.gradient.blend(t, "#000", "#000"),
        a = [{
            on: "measure.theme",
            callback: function() {
                t.yAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).width).orient("left"), t.xAxis().tickSize(-vizuly.core.util.size(t.margin(), t.width(), t.height()).width)
            }
        }, {
            on: "update.theme",
            callback: l
        }, {
            on: "mouseover.theme",
            callback: function(e, l, n) {
                t.selection().selectAll(".vz-scatter-node").style("opacity", .15), d3.select(e).style("opacity", 1).style("stroke-opacity", .5).style("fill-opacity", .9), s.mouseover(e, l, n)
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, n) {
                d3.select(e).style("opacity", 1).style("fill-opacity", function(t, e) {
                    return o.node_fill_opacity(t, e)
                }), t.selection().selectAll(".vz-scatter-node").style("stroke-opacity", 0).style("opacity", 1)
            }
        }];
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (t.selection().attr("class", null), a.forEach(function(e) {
            t.on(e.on, null)
        }), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t = e, void i()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return o;
        if (!c[t]) throw new Error("theme/linearea.js - skin " + t + " does not exist.");
        return o = c[t], e
    }, e.skins = function() {
        return c
    };
    var s = d3.dispatch("mouseover", "mouseout");
    e.on = function(t, l) {
        return s.on(t, l), e
    };
    var c = {
        Fire: {
            name: "Fire",
            labelColor: "#FFF",
            labelFill: "#C50A0A",
            stroke_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            fill_colors: ["#C50A0A", "#C2185B", "#F57C00", "#FF9800", "#FFEB3B"],
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            node_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            node_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            node_fill_opacity: function(t, e) {
                return .5
            },
            class: "vz-skin-fire"
        },
        Sunset: {
            name: "Sunset",
            labelColor: "#FFF",
            labelFill: "#00236C",
            stroke_colors: ["#CD57A4", "#B236A3", "#FA6F7F", "#FA7C3B", "#E96B6B"],
            fill_colors: ["#89208F", "#C02690", "#D93256", "#DB3D0C", "#B2180E"],
            grad1: "#390E1D",
            grad0: "#7C1B31",
            background_transition: n,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            node_stroke: function(t, e) {
                return this.stroke_colors[e % 5]
            },
            node_fill: function(t, e) {
                return this.fill_colors[e % 5]
            },
            node_fill_opacity: function(t, e) {
                return .7
            },
            class: "vz-skin-sunset"
        },
        Neon: {
            name: "Neon",
            labelColor: "#FFF",
            labelFill: "#005",
            grad0: "#000000",
            grad1: "#474747",
            background_transition: n,
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            node_stroke: function(t, e) {
                return "#FFF"
            },
            node_fill: function(t, e) {
                return "#D1F704"
            },
            node_fill_opacity: function(t, e) {
                return .6
            },
            class: "vz-skin-neon"
        },
        Ocean: {
            name: "Ocean",
            labelColor: "#FFF",
            labelFill: "#000",
            background_transition: function(e) {
                t.selection().select(".vz-background").transition(1e3).style("fill-opacity", 0)
            },
            yAxis_line_stroke: "#FFF",
            yAxis_line_opacity: .25,
            node_stroke: function(t, e) {
                return "#00F"
            },
            node_fill: function(t, e) {
                return "#FFF"
            },
            node_fill_opacity: function(t, e) {
                return .4
            },
            class: "vz-skin-ocean"
        }
    };
    return e
}, vizuly.theme.weighted_tree = function(t) {
    function e() {
        n()
    }

    function l() {
        if (s) {
            var e = t.selection();
            o = Math.max(8, Math.round(t.width() / 75)), e.selectAll(".vz-weighted_tree-node circle").style("stroke", function(t) {
                return s.node_stroke(t)
            }).style("stroke-opacity", function(t) {
                return s.node_stroke_opacity(t)
            }).style("fill", function(t) {
                return s.node_fill(t)
            }).style("fill-opacity", function(t) {
                return s.node_fill_opacity(t)
            }), e.selectAll(".vz-weighted_tree-node text").style("font-size", s.font_size()).style("fill", s.label_color).style("fill-opacity", function(t) {
                return s.text_fill_opacity(t)
            }), e.selectAll(".vz-weighted_tree-link").style("stroke", function(t) {
                return s.link_stroke(t)
            }).style("stroke-opacity", function(t) {
                return s.link_stroke_opacity(t)
            })
        }
    }

    function n() {
        a.forEach(function(e) {
            t.on(e.on, e.callback)
        })
    }

    function i() {
        a.forEach(function(e) {
            t.on(e.on, null)
        })
    }
    var o, r = {
            Axiis: {
                name: "Axiis",
                label_color: "#333",
                link_colors: ["#bd0026", "#fecc5c", "#fd8d3c", "#f03b20", "#B02D5D", "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF", "#d7b5d8", "#dd1c77", "#5A0C7A", "#5A0C7A"],
                link_stroke: function(t, e) {
                    return t.target.vz_link_color
                },
                link_stroke_opacity: function(e, l) {
                    return t.value()(e.target) <= 0 ? .15 : .35
                },
                node_fill: function(t, e) {
                    return t.vz_link_color
                },
                node_fill_opacity: function(e, l) {
                    return t.value()(e) <= 0 ? .15 : .4
                },
                node_stroke: function(t, e) {
                    return t.vz_link_color
                },
                node_stroke_opacity: function(t, e) {
                    return .6
                },
                text_fill_opacity: function(e, l) {
                    return t.value()(e) <= 0 ? .35 : 1
                },
                font_size: function() {
                    return o + "px"
                }
            },
            None: {
                name: "None",
                label_color: null,
                link_colors: ["#bd0026", "#fecc5c", "#fd8d3c", "#f03b20", "#B02D5D", "#9B2C67", "#982B9A", "#692DA7", "#5725AA", "#4823AF", "#d7b5d8", "#dd1c77", "#5A0C7A", "#5A0C7A"],
                link_stroke: function(t, e) {
                    return null
                },
                link_stroke_opacity: function(t, e) {
                    return null
                },
                node_fill: function(t, e) {
                    return null
                },
                node_fill_opacity: function(t, e) {
                    return null
                },
                node_stroke: function(t, e) {
                    return null
                },
                node_stroke_opacity: function(t, e) {
                    return null
                },
                text_fill_opacity: function(t, e) {
                    return null
                },
                font_size: function() {
                    return null
                }
            }
        },
        a = (t = t, [{
            on: "update.theme",
            callback: l
        }, {
            on: "data_prepped.theme",
            callback: function() {
                if (s && t.data()) {
                    var e = t.data();
                    t.children()(e).forEach(function(e, l) {
                        e.vz_link_color = s.link_colors[l % s.link_colors.length],
                            function e(l) {
                                t.children()(l) && t.children()(l).forEach(function(t) {
                                    t.vz_link_color = l.vz_link_color, e(t)
                                })
                            }(e)
                    })
                }
            }
        }, {
            on: "mouseover.theme",
            callback: function(e, l, n) {
                var i = t.selection();
                i.selectAll(".vz-id-" + l.vz_tree_id + " circle").style("fill-opacity", .9), i.selectAll("path.vz-id-" + l.vz_tree_id).style("stroke-opacity", .8), i.selectAll(".vz-id-" + l.vz_tree_id + " text").transition().style("font-size", 1.25 * o).style("font-weight", "bold")
            }
        }, {
            on: "mouseout.theme",
            callback: function(e, l, n) {
                var i = t.selection();
                i.selectAll(".vz-weighted_tree-node circle").style("fill", function(t) {
                    return s.node_fill(t)
                }).style("fill-opacity", function(t) {
                    return s.node_fill_opacity(t)
                }), i.selectAll(".vz-weighted_tree-node text").transition().style("font-size", o).style("font-weight", "normal"), i.selectAll(".vz-weighted_tree-link").style("stroke-opacity", function(t) {
                    return s.link_stroke_opacity(t)
                })
            }
        }]);
    e(), e.apply = function(t) {
        return arguments.length > 0 && e.skin(t), l(), e
    }, e.release = function() {
        t && (s = r.None, l(), i(), t = null)
    }, e.viz = function(e) {
        return arguments.length ? (t && i(), t = e, void n()) : t
    }, e.skin = function(t) {
        if (0 == arguments.length) return s;
        if (!r[t]) throw new Error("theme/weightedtree.js - skin " + t + " does not exist.");
        return s = r[t], e
    }, e.skins = function() {
        return r
    };
    var s = r[vizuly.skin.WEIGHTED_TREE_AXIIS];
    return e
}, vizuly.skin.WEIGHTED_TREE_AXIIS = "Axiis", vizuly.ui.range_input = function(t) {
    function e() {
        n.validate(), i = vizuly.core.util.size(l.margin, l.width, l.height), h.range([0, i.width]), h.domain(l.domain), p = Math.round(i.height * l.trackHeight), v = l.handleWidth, l.dispatch.measure(), o.attr("width", l.width).attr("height", l.height), r.attr("width", l.width).attr("height", l.height), s.style("width", i.width).style("height", i.height).attr("transform", "translate(" + i.left + "," + i.top + ")"), d.attr("width", i.width).attr("height", p).attr("y", (i.height - p) / 2), c.attr("width", v).attr("height", i.height).attr("x", h(l.data[0])), u.attr("width", v).attr("height", i.height).attr("x", h(l.data[1])), f.attr("width", h(l.data[0])).attr("height", i.height), _.attr("width", i.width - h(l.data[1])).attr("height", i.height).attr("x", h(l.data[1])), y.attr("width", h(l.data[1]) - h(l.data[0])).attr("height", i.height).attr("x", h(l.data[0])), l.dispatch.update()
    }
    var l = {},
        n = vizuly.core.component(t, l, {
            data: [.25, .75],
            margin: {
                top: "10%",
                bottom: "7%",
                left: "8%",
                right: "7%"
            },
            domain: [0, 1],
            duration: 500,
            width: 300,
            height: 300,
            handleWidth: 3,
            trackHeight: .1
        }, ["change", "handleOver", "handleOut"]);
    n.type = "viz.ui.range_input";
    var i, o, r, a, s, c, u, f, y, _, d, p, v, h = d3.scale.linear(),
        k = d3.behavior.drag(),
        F = d3.behavior.drag(),
        g = d3.behavior.drag();
    return k.on("drag", function() {
        var t = h.invert(d3.event.x);
        t = Math.min(l.data[1] - h.invert(v), Math.max(t, l.domain[0])), l.data[0] = t, l.dispatch.change(n), e()
    }), F.on("drag", function() {
        var t = h.invert(d3.event.x);
        t = Math.max(l.data[0] + h.invert(v), Math.min(t, l.domain[1])), l.data[1] = t, l.dispatch.change(n), e()
    }), g.on("drag", function() {
        var t = h.invert(d3.event.dx) + l.data[0];
        t = Math.min(l.data[1], Math.max(t, l.domain[0]));
        var i = l.data[1] - l.data[0];
        t = Math.min(l.domain[1] - i, t), l.data[0] = t, l.data[1] = t + i, l.dispatch.change(n), e()
    }), o = l.selection.append("svg").attr("id", l.id).style("overflow", "visible").attr("class", "vizuly"), vizuly.core.util.getDefs(n), r = o.append("rect").attr("class", "vz-background"), a = o.append("g").attr("class", "vz-range_input"), s = a.append("g").attr("class", "vz-plot"), d = s.append("rect").attr("class", "vz-range_input-track"), f = s.append("rect").attr("class", "vz-range_input-sidepane"), y = s.append("rect").attr("class", "vz-range_input-centerpane"), _ = s.append("rect").attr("class", "vz-range_input-sidepane"), c = s.append("rect").attr("class", "vz-range_input-handle"), u = s.append("rect").attr("class", "vz-range_input-handle"), c.call(k), u.call(F), y.call(g), l.dispatch.initialize(), n.update = function() {
        return e(), n
    }, n
};
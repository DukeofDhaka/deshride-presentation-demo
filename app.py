from __future__ import annotations

import io
import json
import os
from datetime import date, timedelta
from pathlib import Path

import pandas as pd
import plotly.graph_objects as go
import qrcode
import streamlit as st


APP_DIR = Path(__file__).resolve().parent
CONTENT_PATH = APP_DIR / "data" / "deshride_content.json"
LOGO_PATH = APP_DIR / "assets" / "deshride_logo_primary.png"

INK = "#143f39"
GOLD = "#cea24f"
CORAL = "#de6547"
CREAM = "#f5efe6"
STONE = "#5f6764"
MIST = "#dfebe6"
BLUSH = "#f6e8e1"
PAPER = "#fbf8f2"


@st.cache_data
def load_content() -> dict:
    return json.loads(CONTENT_PATH.read_text(encoding="utf-8"))


def get_public_app_url() -> str | None:
    env_value = os.getenv("PUBLIC_APP_URL")
    if env_value:
        return env_value
    try:
        return st.secrets["PUBLIC_APP_URL"]
    except Exception:
        return None


def make_qr_png(url: str) -> bytes:
    qr = qrcode.QRCode(border=1, box_size=8)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color=INK, back_color="white")
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    return buffer.getvalue()


def inject_css() -> None:
    st.markdown(
        f"""
        <style>
          :root {{
            --ink: {INK};
            --gold: {GOLD};
            --coral: {CORAL};
            --cream: {CREAM};
            --paper: {PAPER};
            --mist: {MIST};
            --blush: {BLUSH};
            --stone: {STONE};
            --line: rgba(20, 63, 57, 0.12);
          }}

          .stApp {{
            background:
              radial-gradient(circle at top right, rgba(222, 101, 71, 0.08), transparent 28%),
              linear-gradient(180deg, var(--paper) 0%, var(--cream) 100%);
          }}

          [data-testid="stHeader"] {{
            background: transparent;
          }}

          .block-container {{
            max-width: 1180px;
            padding-top: 1.6rem;
            padding-bottom: 4rem;
          }}

          .eyebrow {{
            display: inline-block;
            padding: 0.35rem 0.75rem;
            border-radius: 999px;
            background: rgba(222, 101, 71, 0.12);
            color: var(--coral);
            font-size: 0.78rem;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }}

          .hero-shell {{
            padding: 1.2rem 0 0.4rem 0;
          }}

          .hero-title {{
            color: var(--ink);
            font-size: clamp(2.35rem, 5vw, 4.4rem);
            line-height: 0.98;
            margin: 0.7rem 0 0.9rem 0;
            font-weight: 800;
            letter-spacing: -0.03em;
          }}

          .hero-copy {{
            color: var(--stone);
            font-size: 1.05rem;
            line-height: 1.75;
            max-width: 44rem;
            margin-bottom: 1.1rem;
          }}

          .hero-note {{
            color: var(--stone);
            font-size: 0.95rem;
          }}

          .card-surface {{
            background: rgba(255, 255, 255, 0.74);
            border: 1px solid var(--line);
            border-radius: 24px;
            padding: 1.1rem 1.2rem;
            box-shadow: 0 10px 36px rgba(20, 63, 57, 0.06);
          }}

          [data-testid="stVerticalBlockBorderWrapper"] {{
            background: rgba(255, 255, 255, 0.74);
            border: 1px solid var(--line);
            border-radius: 24px;
            padding: 0.4rem 0.55rem;
            box-shadow: 0 10px 36px rgba(20, 63, 57, 0.06);
          }}

          .panel-list {{
            color: var(--stone);
            margin: 0.2rem 0 0 1.1rem;
            padding: 0;
            line-height: 1.65;
          }}

          .panel-list li {{
            margin-bottom: 0.42rem;
          }}

          .metric-card {{
            background: rgba(255, 255, 255, 0.74);
            border: 1px solid var(--line);
            border-radius: 22px;
            padding: 1rem 1.05rem;
            min-height: 152px;
          }}

          .metric-value {{
            color: var(--ink);
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.04em;
            margin-bottom: 0.1rem;
          }}

          .metric-label {{
            color: var(--ink);
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.35rem;
          }}

          .metric-note {{
            color: var(--stone);
            font-size: 0.92rem;
            line-height: 1.5;
          }}

          .section-title {{
            color: var(--ink);
            font-size: clamp(1.8rem, 3vw, 2.7rem);
            line-height: 1.05;
            letter-spacing: -0.03em;
            margin: 0.15rem 0 0.4rem 0;
            font-weight: 800;
          }}

          .section-copy {{
            color: var(--stone);
            font-size: 1rem;
            line-height: 1.7;
            margin-bottom: 1rem;
          }}

          .callout-card {{
            border-radius: 22px;
            padding: 1rem 1.05rem;
            border: 1px solid var(--line);
            min-height: 100%;
          }}

          .callout-card.problem {{
            background: rgba(222, 101, 71, 0.08);
          }}

          .callout-card.opportunity {{
            background: rgba(206, 162, 79, 0.12);
          }}

          .callout-title {{
            color: var(--ink);
            font-size: 1.08rem;
            font-weight: 800;
            margin-bottom: 0.7rem;
          }}

          .mini-tag {{
            display: inline-block;
            padding: 0.28rem 0.65rem;
            border-radius: 999px;
            background: rgba(20, 63, 57, 0.08);
            color: var(--ink);
            font-size: 0.78rem;
            font-weight: 700;
            margin: 0 0.35rem 0.4rem 0;
          }}

          .step-chip {{
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            margin: 0 0.5rem 0.55rem 0;
            padding: 0.45rem 0.72rem;
            border-radius: 999px;
            border: 1px solid var(--line);
            color: var(--stone);
            background: rgba(255, 255, 255, 0.58);
            font-size: 0.85rem;
            font-weight: 700;
          }}

          .step-chip.active {{
            color: white;
            background: var(--ink);
            border-color: var(--ink);
          }}

          .summary-card {{
            background: linear-gradient(155deg, rgba(20, 63, 57, 0.98), rgba(20, 63, 57, 0.82));
            color: white;
            border-radius: 28px;
            padding: 1.15rem 1.2rem;
            min-height: 100%;
          }}

          .summary-card h4 {{
            margin: 0;
            font-size: 1.15rem;
          }}

          .summary-pill {{
            display: inline-block;
            border-radius: 999px;
            padding: 0.28rem 0.65rem;
            margin: 0 0.35rem 0.4rem 0;
            background: rgba(255, 255, 255, 0.16);
            color: white;
            font-size: 0.78rem;
            font-weight: 700;
          }}

          .summary-number {{
            font-size: 2.35rem;
            line-height: 1;
            font-weight: 800;
            letter-spacing: -0.04em;
            margin: 0.45rem 0 0.25rem 0;
          }}

          .flow-box {{
            border-radius: 20px;
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.7);
            padding: 0.95rem 1rem;
            min-height: 132px;
          }}

          .flow-number {{
            color: var(--coral);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.45rem;
          }}

          .flow-title {{
            color: var(--ink);
            font-size: 1rem;
            font-weight: 800;
            margin-bottom: 0.35rem;
          }}

          .flow-copy {{
            color: var(--stone);
            font-size: 0.92rem;
            line-height: 1.55;
          }}

          .quote-card {{
            background: linear-gradient(180deg, rgba(206, 162, 79, 0.18), rgba(255, 255, 255, 0.68));
            border: 1px solid rgba(206, 162, 79, 0.32);
            border-radius: 24px;
            padding: 1.1rem 1.15rem;
            color: var(--ink);
            font-size: 1.06rem;
            line-height: 1.7;
            font-weight: 700;
          }}

          .phase-card {{
            border-radius: 24px;
            border: 1px solid var(--line);
            background: rgba(255, 255, 255, 0.72);
            padding: 1rem 1.05rem;
            min-height: 100%;
          }}

          .phase-top {{
            color: var(--coral);
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.4rem;
          }}

          .phase-headline {{
            color: var(--ink);
            font-size: 1.12rem;
            font-weight: 800;
            margin-bottom: 0.55rem;
          }}

          .footer-note {{
            color: var(--stone);
            font-size: 0.88rem;
            line-height: 1.6;
          }}
        </style>
        """,
        unsafe_allow_html=True,
    )


def chunked(items: list[dict], size: int) -> list[list[dict]]:
    return [items[idx : idx + size] for idx in range(0, len(items), size)]


def render_html_panel(
    title: str,
    *,
    body: str | None = None,
    items: list[str] | None = None,
    css_class: str = "card-surface",
    eyebrow: str | None = None,
    title_class: str = "callout-title",
    footer: str | None = None,
) -> None:
    parts = [f'<div class="{css_class}">']
    if eyebrow:
        parts.append(f'<div class="phase-top">{eyebrow}</div>')
    parts.append(f'<div class="{title_class}">{title}</div>')
    if body:
        parts.append(f'<div class="section-copy" style="margin-bottom:0.45rem;">{body}</div>')
    if items:
        parts.append("<ul class='panel-list'>")
        parts.extend([f"<li>{item}</li>" for item in items])
        parts.append("</ul>")
    if footer:
        parts.append(f'<div class="footer-note">{footer}</div>')
    parts.append("</div>")
    st.markdown("".join(parts), unsafe_allow_html=True)


def set_defaults(content: dict) -> None:
    route_names = [route["name"] for route in content["routes"]]
    rail_names = [rail["name"] for rail in content["booking_demo"]["payment_rails"]]
    if "selected_route" not in st.session_state:
        st.session_state.selected_route = route_names[0]
    if "travel_date" not in st.session_state:
        st.session_state.travel_date = date.today() + timedelta(days=7)
    if "seat_count" not in st.session_state:
        st.session_state.seat_count = 1
    if "payment_rail" not in st.session_state:
        st.session_state.payment_rail = rail_names[0]
    if "booking_step" not in st.session_state:
        st.session_state.booking_step = 0


def get_route(content: dict) -> dict:
    for route in content["routes"]:
        if route["name"] == st.session_state.selected_route:
            return route
    return content["routes"][0]


def get_rail(content: dict) -> dict:
    for rail in content["booking_demo"]["payment_rails"]:
        if rail["name"] == st.session_state.payment_rail:
            return rail
    return content["booking_demo"]["payment_rails"][0]


def render_header(content: dict) -> None:
    left_col, right_col = st.columns([2.2, 1], gap="large")
    with left_col:
        if LOGO_PATH.exists():
            st.image(str(LOGO_PATH), width=280)
        st.markdown('<div class="eyebrow">Public presentation demo</div>', unsafe_allow_html=True)
        st.markdown(
            f'<div class="hero-shell"><div class="hero-title">{content["brand"]["hero_title"]}</div></div>',
            unsafe_allow_html=True,
        )
        st.markdown(
            f'<div class="hero-copy">{content["brand"]["hero_body"]}</div>',
            unsafe_allow_html=True,
        )
        st.markdown(
            f'<div class="hero-note">{content["brand"]["demo_notice"]}</div>',
            unsafe_allow_html=True,
        )

    with right_col:
        with st.container(border=True):
            st.markdown("### Share the demo")
            public_url = get_public_app_url()
            if public_url:
                qr_bytes = make_qr_png(public_url)
                st.image(qr_bytes, width=220)
                st.markdown(f"Open on your phone: `{public_url}`")
                st.download_button(
                    label="Download QR PNG",
                    data=qr_bytes,
                    file_name="deshride-demo-qr.png",
                    mime="image/png",
                    use_container_width=True,
                )
            else:
                st.info(
                    "Add `PUBLIC_APP_URL` as an environment variable or Streamlit secret to render the live QR code."
                )


def render_sections(content: dict) -> None:
    st.markdown("")
    tabs = st.tabs(["Overview", "Try DeshRide", "Trust & Payments", "Why It Works", "Economics & Launch"])
    with tabs[0]:
        render_overview(content)
    with tabs[1]:
        render_try_deshride(content)
    with tabs[2]:
        render_trust_payments(content)
    with tabs[3]:
        render_why_it_works(content)
    with tabs[4]:
        render_economics_launch(content)


def render_metric_grid(metrics: list[dict]) -> None:
    for row in chunked(metrics, 3):
        cols = st.columns(len(row), gap="medium")
        for col, metric in zip(cols, row):
            with col:
                st.markdown(
                    f"""
                    <div class="metric-card">
                      <div class="metric-value">{metric["value"]}</div>
                      <div class="metric-label">{metric["label"]}</div>
                      <div class="metric-note">{metric["note"]}</div>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )


def route_fare_chart(content: dict) -> go.Figure:
    df = pd.DataFrame(content["routes"])
    fig = go.Figure()
    fig.add_bar(
        x=df["name"],
        y=df["bus_fare_mid_bdt"],
        name="Bus midpoint",
        marker_color=GOLD,
        hovertemplate="%{x}<br>Bus midpoint: Tk%{y}<extra></extra>",
    )
    fig.add_bar(
        x=df["name"],
        y=df["deshride_fare_bdt"],
        name="DeshRide fare",
        marker_color=INK,
        hovertemplate="%{x}<br>DeshRide: Tk%{y}<extra></extra>",
    )
    fig.update_layout(
        barmode="group",
        height=360,
        margin=dict(l=10, r=10, t=20, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        legend=dict(orientation="h", y=1.08, x=0),
    )
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(
        gridcolor="rgba(20, 63, 57, 0.08)",
        title="Fare (Tk)",
        rangemode="tozero",
    )
    return fig


def projection_chart(content: dict) -> go.Figure:
    df = pd.DataFrame(content["economics"]["projection_rows"])
    fig = go.Figure()
    fig.add_trace(
        go.Scatter(
            x=df["year"],
            y=df["avg_daily_seats"],
            name="Avg daily seats",
            mode="lines+markers",
            line=dict(color=INK, width=4),
            marker=dict(size=10),
            hovertemplate="%{x}<br>%{y} avg daily seats<extra></extra>",
        )
    )
    fig.add_trace(
        go.Bar(
            x=df["year"],
            y=df["platform_revenue_bdt_mn"],
            name="Platform revenue (Tk mn)",
            marker_color=CORAL,
            opacity=0.7,
            yaxis="y2",
            hovertemplate="%{x}<br>Tk%{y}M platform revenue<extra></extra>",
        )
    )
    fig.update_layout(
        height=380,
        margin=dict(l=10, r=10, t=30, b=10),
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        legend=dict(orientation="h", y=1.08, x=0),
        yaxis=dict(title="Avg daily seats", gridcolor="rgba(20, 63, 57, 0.08)"),
        yaxis2=dict(
            title="Platform revenue (Tk mn)",
            overlaying="y",
            side="right",
            showgrid=False,
        ),
    )
    return fig


def render_overview(content: dict) -> None:
    overview = content["overview"]
    st.markdown(
        f'<div class="section-title">{overview["problem_title"]}</div>',
        unsafe_allow_html=True,
    )
    st.markdown(
        f'<div class="section-copy">{overview["problem_summary"]}</div>',
        unsafe_allow_html=True,
    )
    render_metric_grid(overview["market_metrics"])

    st.markdown("")
    left_col, right_col = st.columns(2, gap="large")
    with left_col:
        render_html_panel(
            "The problem",
            items=overview["problem_points"],
            css_class="callout-card problem",
        )

    with right_col:
        render_html_panel(
            "Why now",
            items=overview["opportunity_points"],
            css_class="callout-card opportunity",
        )

    st.markdown("")
    st.markdown(
        '<div class="section-title">Pilot corridors and rider trade-offs</div>',
        unsafe_allow_html=True,
    )
    st.markdown(
        '<div class="section-copy">DeshRide is priced above bus travel, but it is still aimed at value-conscious riders who want more confidence and flexibility than informal matching can offer.</div>',
        unsafe_allow_html=True,
    )
    chart_col, note_col = st.columns([1.45, 1], gap="large")
    with chart_col:
        st.plotly_chart(
            route_fare_chart(content),
            use_container_width=True,
            config={"displayModeBar": False},
        )
    with note_col:
        render_html_panel(
            "What the app is really selling",
            items=[
                "Verified onboarding instead of unknown drivers",
                "Prepaid commitment instead of cash-only coordination",
                "Safe Hub pickup instead of vague meetups",
                "Repeat trust data that gets stronger corridor by corridor",
            ],
        )


def render_try_deshride(content: dict) -> None:
    route = get_route(content)
    rail = get_rail(content)
    steps = content["booking_demo"]["steps"]
    current_step = steps[st.session_state.booking_step]
    premium = route["deshride_fare_bdt"] - route["bus_fare_mid_bdt"]

    st.markdown('<div class="section-title">Try DeshRide</div>', unsafe_allow_html=True)
    st.markdown(
        '<div class="section-copy">This is the core product moment for your presentation: one route selection updates the booking story, payment choice, Safe Hub details, and trip summary across the app.</div>',
        unsafe_allow_html=True,
    )

    controls_col, summary_col = st.columns([1.3, 1], gap="large")
    with controls_col:
        with st.container(border=True):
            st.markdown("#### Build a sample trip")
            route_names = [item["name"] for item in content["routes"]]
            st.selectbox("Corridor", route_names, key="selected_route")
            st.date_input("Travel date", key="travel_date", min_value=date.today())
            st.number_input("Seats", min_value=1, max_value=4, step=1, key="seat_count")
            rail_names = [item["name"] for item in content["booking_demo"]["payment_rails"]]
            st.radio("Payment rail", rail_names, key="payment_rail", horizontal=True)
            st.caption(f"{rail['label']}: {rail['detail']}")

        step_markup = "".join(
            [
                f'<span class="step-chip {"active" if idx == st.session_state.booking_step else ""}">{idx + 1}. {step["short"]}</span>'
                for idx, step in enumerate(steps)
            ]
        )
        st.markdown(step_markup, unsafe_allow_html=True)
        st.markdown(
            f"""
            <div class="card-surface">
              <div class="callout-title">{current_step["title"]}</div>
              <div class="section-copy" style="margin-bottom:0.45rem;">{current_step["body"]}</div>
              <div class="footer-note"><strong>Why it matters:</strong> {current_step["assurance"]}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

        prev_col, next_col, reset_col = st.columns(3)
        with prev_col:
            if st.button("Previous step", use_container_width=True):
                st.session_state.booking_step = max(0, st.session_state.booking_step - 1)
                st.rerun()
        with next_col:
            if st.button("Next step", use_container_width=True):
                st.session_state.booking_step = min(len(steps) - 1, st.session_state.booking_step + 1)
                st.rerun()
        with reset_col:
            if st.button("Restart flow", use_container_width=True):
                st.session_state.booking_step = 0
                st.rerun()

    with summary_col:
        st.markdown(
            f"""
            <div class="summary-card">
              <h4>Trip summary</h4>
              <div class="summary-number">Tk{route["deshride_fare_bdt"] * st.session_state.seat_count:,}</div>
              <div style="color: rgba(255,255,255,0.82); margin-bottom: 0.8rem;">
                {route["name"]} · {route["trip_time"]} · {st.session_state.seat_count} seat(s)
              </div>
              <div class="summary-pill">Pickup: {route["pickup_hub"]}</div>
              <div class="summary-pill">Dropoff: {route["dropoff_hub"]}</div>
              <div class="summary-pill">Rail: {st.session_state.payment_rail}</div>
              <div class="summary-pill">Premium vs bus midpoint: Tk{premium}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
        st.markdown("")
        with st.container(border=True):
            st.markdown("#### Why a rider picks this route")
            for point in route["why_choose"]:
                st.write(f"- {point}")
            st.markdown("#### Trust badges")
            badge_markup = "".join(
                [f'<span class="mini-tag">{badge}</span>' for badge in content["booking_demo"]["trust_badges"]]
            )
            st.markdown(badge_markup, unsafe_allow_html=True)
            st.caption("Simulation only: no real payments or bookings are processed in this demo.")


def render_trust_payments(content: dict) -> None:
    trust = content["trust_flow"]
    rail = get_rail(content)
    st.markdown(f'<div class="section-title">{trust["title"]}</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="section-copy">{trust["subtitle"]}</div>', unsafe_allow_html=True)

    step_cols = st.columns(len(trust["payment_steps"]), gap="small")
    for idx, (col, step) in enumerate(zip(step_cols, trust["payment_steps"])):
        with col:
            st.markdown(
                f"""
                <div class="flow-box">
                  <div class="flow-number">Step {idx + 1}</div>
                  <div class="flow-copy">{step}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown("")
    left_col, right_col = st.columns([1.1, 1], gap="large")
    with left_col:
        with st.container(border=True):
            st.markdown("#### Reliability Score")
            st.write("DeshRide solves a trust problem by turning repeated behavior into better information.")
            for item in trust["reliability_score"]:
                st.write(f"- {item}")
            st.caption(f"Current rail in the demo: {rail['name']} ({rail['label'].lower()})")

    with right_col:
        render_html_panel(
            "What riders and drivers gain",
            items=[
                "Riders keep the 24-hour dispute window before payout clears.",
                "Drivers benefit from T+1 settlement after the trip is validated.",
                "Both sides help strengthen the trust layer with completed-trip history.",
            ],
        )

    st.markdown("")
    future_cols = st.columns(len(trust["future_layers"]), gap="large")
    for col, layer in zip(future_cols, trust["future_layers"]):
        with col:
            render_html_panel(
                "Future finance layer",
                items=layer["items"],
                css_class="phase-card",
                eyebrow=layer["phase"],
                title_class="phase-headline",
            )


def render_why_it_works(content: dict) -> None:
    why = content["why_it_works"]
    st.markdown(f'<div class="section-title">{why["title"]}</div>', unsafe_allow_html=True)
    st.markdown(f'<div class="section-copy">{why["subtitle"]}</div>', unsafe_allow_html=True)

    flywheel_cols = st.columns(4, gap="small")
    for idx, (col, item) in enumerate(zip(flywheel_cols, why["flywheel"])):
        with col:
            st.markdown(
                f"""
                <div class="flow-box">
                  <div class="flow-number">Flywheel {idx + 1}</div>
                  <div class="flow-copy">{item}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown("")
    left_col, right_col = st.columns([1.05, 1.2], gap="large")
    with left_col:
        st.markdown(
            f'<div class="quote-card">"{why["moat_quote"]}"</div>',
            unsafe_allow_html=True,
        )
        st.markdown("")
        render_html_panel(
            why["credits"]["headline"],
            items=why["credits"]["points"],
        )

    with right_col:
        comp_df = pd.DataFrame(why["comparison_rows"])
        with st.container(border=True):
            st.markdown("#### Positioning against incumbents")
            st.dataframe(
                comp_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "player": "Player",
                    "core_job": "Core job",
                    "economic_logic": "Economic logic",
                    "what_is_different": "What is different",
                },
            )


def render_economics_launch(content: dict) -> None:
    economics = content["economics"]
    launch = content["launch"]
    st.markdown('<div class="section-title">Economics and launch plan</div>', unsafe_allow_html=True)
    st.markdown(
        '<div class="section-copy">The economics stay grounded in the final deck: the idea is not to make DeshRide look huge on day one, but to show how a narrow launch compounds into a defensible business.</div>',
        unsafe_allow_html=True,
    )
    metric_cols = st.columns(len(economics["unit_metrics"]), gap="small")
    for col, metric in zip(metric_cols, economics["unit_metrics"]):
        with col:
            st.markdown(
                f"""
                <div class="metric-card" style="min-height:120px;">
                  <div class="metric-value" style="font-size:1.7rem;">{metric["value"]}</div>
                  <div class="metric-label">{metric["label"]}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )

    st.markdown("")
    chart_col, table_col = st.columns([1.2, 1], gap="large")
    projection_df = pd.DataFrame(economics["projection_rows"])
    valuation_df = pd.DataFrame(economics["valuation_rows"])
    with chart_col:
        st.plotly_chart(
            projection_chart(content),
            use_container_width=True,
            config={"displayModeBar": False},
        )
    with table_col:
        with st.container(border=True):
            st.markdown("#### 3-year projection")
            st.dataframe(
                projection_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "year": "Year",
                    "corridors": "Corridors",
                    "avg_daily_seats": "Avg daily seats",
                    "gmv_bdt_mn": st.column_config.NumberColumn("GMV (Tk mn)", format="%.1f"),
                    "platform_revenue_bdt_mn": st.column_config.NumberColumn("Revenue (Tk mn)", format="%.1f"),
                    "contribution_bdt_mn": st.column_config.NumberColumn("Contribution (Tk mn)", format="%.1f"),
                },
            )
            st.caption(economics["valuation_note"])

    st.markdown("")
    left_col, right_col = st.columns([1.2, 1], gap="large")
    with left_col:
        phase_cols = st.columns(len(launch["phases"]), gap="medium")
        for col, phase in zip(phase_cols, launch["phases"]):
            with col:
                render_html_panel(
                    phase["headline"],
                    items=phase["bullets"],
                    css_class="phase-card",
                    eyebrow=f'{phase["phase"]} · {phase["window"]}',
                    title_class="phase-headline",
                )
    with right_col:
        with st.container(border=True):
            st.markdown("#### The ask")
            st.write(f"- Raising: {launch['ask']['raising_usd']} seed")
            st.write(f"- Pre-money: {launch['ask']['pre_money_usd']}")
            st.write(f"- Dilution: {launch['ask']['dilution']}")
            st.write(f"- Runway: {launch['ask']['runway']}")
            st.markdown("#### Valuation scenarios")
            st.dataframe(
                valuation_df,
                use_container_width=True,
                hide_index=True,
                column_config={
                    "scenario": "Scenario",
                    "m18_daily_seats": "M18 seats/day",
                    "pre_money_usd_mn": st.column_config.NumberColumn("Pre-money ($M)", format="%.1f"),
                },
            )
            st.markdown("#### Why incumbents do not win by default")
            for note in launch["incumbent_note"]:
                st.write(f"- {note}")


def render_footer(content: dict) -> None:
    with st.expander("About this demo and sources"):
        st.markdown(
            '<div class="footer-note">This app is designed as a presentation companion, not a real booking product. The narrative and figures come from the final pitch deck and executive brief, with the share QR becoming active only after you provide the public deployment URL.</div>',
            unsafe_allow_html=True,
        )
        for source in content["sources"]:
            st.write(f"- {source['label']}: {source['detail']} (`{source['reference']}`)")


def main() -> None:
    st.set_page_config(
        page_title="DeshRide Demo",
        layout="wide",
        initial_sidebar_state="collapsed",
    )
    content = load_content()
    set_defaults(content)
    inject_css()
    render_header(content)
    render_sections(content)
    st.markdown("")
    render_footer(content)


if __name__ == "__main__":
    main()

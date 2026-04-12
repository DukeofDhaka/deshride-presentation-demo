# DeshRide Streamlit Demo

This folder contains a public-friendly Streamlit presentation app for the DeshRide concept.

## Run locally

```bash
cd deshride_app
python3 -m pip install -r requirements.txt
streamlit run app.py
```

## Public QR setup

The app renders a QR code only when `PUBLIC_APP_URL` is available.

Set it with an environment variable:

```bash
export PUBLIC_APP_URL="https://your-deshride-demo.streamlit.app"
streamlit run app.py
```

Or add it to Streamlit Community Cloud secrets:

```toml
PUBLIC_APP_URL = "https://your-deshride-demo.streamlit.app"
```

## Deploy options

Any public URL will work for the QR code as long as the app is reachable from a phone browser.

### Easiest: Streamlit Community Cloud

1. Push `deshride_app/` to a GitHub repo.
2. Create a new Streamlit Community Cloud app.
3. Point the app to `deshride_app/app.py`.
4. Add the `PUBLIC_APP_URL` secret after the app URL is live.
5. Download the QR PNG from the app and place it on your presentation slide if you want a fixed visual.

### Other hosts

You can also run the same app anywhere that can serve a Streamlit process, such as Render, Railway, Fly.io, or your own VM. The only requirement for the QR panel is that `PUBLIC_APP_URL` matches the final public address.

## Notes

- The app is intentionally simulation-only: no login, no backend, and no real payments.
- All major copy and figures live in `data/deshride_content.json` so the story stays consistent.

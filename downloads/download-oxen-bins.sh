#!/bin/bash

# THIS IS TEMPORARY. TO BE REMOVED ONCE OXEN STUFF IS IN STABLE ON LOKI/OXEN CORE

set -e

if [ -z "$OS" ]; then
    echo "OS must be set"
    exit 1
fi

if [ -z "$RENAME" ]; then
    RENAME="latest"
fi

if [ "$OS" == "Linux" ]; then
    ASSET_URL="https://oxen.rocks/loki-project/loki-core/oxen-stable-linux-LATEST.tar.xz"
elif [ "$OS" == "Windows" ]; then
    ASSET_URL="https://oxen.rocks/loki-project/loki-core/oxen-stable-win-LATEST.zip"
elif [ "$OS" == "macOS" ]; then
    ASSET_URL="https://oxen.rocks/loki-project/loki-core/oxen-stable-macos-LATEST.tar.xz"
else
    echo "OS must be Linux, Windows or macOS"
    exit 1
fi

echo "About to download the binaries"

curl -sL --fail \
    -H "Accept: application/octet-stream" \
    -o "${RENAME}" \
    "$ASSET_URL"

echo "Oxen binaries downloaded"
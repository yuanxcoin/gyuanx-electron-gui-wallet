#!/bin/bash

set -e

if [ -z "$OS" ]; then
    echo "OS must be set"
    exit 1
fi

if [ -z "$RENAME" ]; then
    RENAME="latest"
fi

if [ "$OS" == "Linux" ]; then
    FILE_OS="linux"
elif [ "$OS" == "Windows" ]; then
    FILE_OS="win"
elif [ "$OS" == "macOS" ]; then
    FILE_OS="macos"
else
    echo "OS must be Linux, Windows or macOS"
    exit 1
fi

echo "About to download the binaries"

ASSET_URL="https://builds.lokinet.dev/loki-project/loki-core/loki-dev-${FILE_OS}-LATEST.tar.xz"

curl -sL --fail \
    -H "Accept: application/octet-stream" \
    -o "${RENAME}" \
    "$ASSET_URL"

echo "Loki binaries downloaded"
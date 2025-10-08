#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
BACKUP_DIR="$ROOT_DIR/css-legacy-backup"
TARGET_DIR="$ROOT_DIR/css"

if [[ ! -d "$BACKUP_DIR" ]]; then
  echo "[error] 未找到备份目录: $BACKUP_DIR" >&2
  exit 1
fi

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "[error] 未找到当前 css 目录: $TARGET_DIR" >&2
  exit 1
fi

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
REF_DIR="$ROOT_DIR/css-refactored-$TIMESTAMP"

echo "[info] 将当前 css 目录移动到 $REF_DIR 以便留存。"
mv "$TARGET_DIR" "$REF_DIR"

echo "[info] 从备份恢复 css 目录..."
cp -a "$BACKUP_DIR" "$TARGET_DIR"

echo "[success] 恢复完成。旧结构已放置在 css/ 下，重构版本保存在 $REF_DIR。"

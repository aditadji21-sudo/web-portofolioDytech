/**
 * Convert Google Drive file ID atau URL ke direct image URL yang bisa
 * dipakai langsung oleh <Image> / <img>.
 *
 * Support input:
 *   - File ID saja       : "1abc123xyz"
 *   - Full share URL     : "https://drive.google.com/file/d/1abc123xyz/view"
 *   - uc?export URL      : "https://drive.google.com/uc?id=1abc123xyz"
 *   - open?id URL        : "https://drive.google.com/open?id=1abc123xyz"
 *   - lh3 URL            : "https://lh3.googleusercontent.com/d/1abc123xyz"
 *   - Local path          : "/some-image.svg"  → returned as-is
 *   - External non-GDrive : "https://example.com/img.jpg" → returned as-is
 *   - Empty / undefined   : returns undefined
 *
 * Output selalu menggunakan format lh3 karena lebih cepat dan support resize:
 *   https://lh3.googleusercontent.com/d/{FILE_ID}
 */

const GDRIVE_HOST = "drive.google.com";
const LH3_HOST = "lh3.googleusercontent.com";

// Regex patterns untuk extract file ID dari berbagai format URL Google Drive
const FILE_D_PATTERN = /\/file\/d\/([a-zA-Z0-9_-]+)/;
const UC_ID_PATTERN = /[?&]id=([a-zA-Z0-9_-]+)/;
const OPEN_ID_PATTERN = /\/open\?id=([a-zA-Z0-9_-]+)/;
const LH3_D_PATTERN = /\/d\/([a-zA-Z0-9_-]+)/;

// Google Drive file IDs: alfanumerik, dash, underscore, panjang ~20-44 karakter
const FILE_ID_PATTERN = /^[a-zA-Z0-9_-]{20,}$/;

function extractFileId(input: string): string | null {
  // Cek apakah input adalah URL
  try {
    const url = new URL(input);
    const host = url.hostname;

    if (host === GDRIVE_HOST || host.endsWith(`.${GDRIVE_HOST}`)) {
      // https://drive.google.com/file/d/{ID}/...
      const fileMatch = input.match(FILE_D_PATTERN);
      if (fileMatch) return fileMatch[1];

      // https://drive.google.com/uc?id={ID} atau ?export=view&id={ID}
      const ucMatch = input.match(UC_ID_PATTERN);
      if (ucMatch) return ucMatch[1];

      // https://drive.google.com/open?id={ID}
      const openMatch = input.match(OPEN_ID_PATTERN);
      if (openMatch) return openMatch[1];
    }

    if (host === LH3_HOST) {
      // https://lh3.googleusercontent.com/d/{ID}
      const lh3Match = input.match(LH3_D_PATTERN);
      if (lh3Match) return lh3Match[1];
    }

    // URL valid tapi bukan Google Drive → return null (akan di-pass through)
    return null;
  } catch {
    // Bukan URL — mungkin file ID atau path lokal
  }

  // Cek apakah input adalah file ID polos
  if (FILE_ID_PATTERN.test(input)) {
    return input;
  }

  return null;
}

/**
 * Convert input (file ID, Google Drive URL, atau path lokal) ke direct image URL.
 * Path lokal dan URL non-Google Drive di-return apa adanya.
 */
export function gdriveImageUrl(input: string | undefined): string | undefined {
  if (!input?.trim()) return undefined;

  const trimmed = input.trim();

  // Path lokal (dimulai dengan /) — langsung return
  if (trimmed.startsWith("/")) return trimmed;

  const fileId = extractFileId(trimmed);
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Bukan Google Drive dan bukan file ID → return apa adanya
  // (misal URL external lain, atau string yang tidak dikenali)
  return trimmed;
}

/**
 * Batch convert array of image inputs.
 */
export function gdriveImageUrls(inputs: string[] | undefined): string[] | undefined {
  if (!inputs || inputs.length === 0) return undefined;
  return inputs
    .map((i) => gdriveImageUrl(i))
    .filter((url): url is string => url !== undefined);
}

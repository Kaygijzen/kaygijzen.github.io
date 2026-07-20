import type { ReactNode } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { FaApple, FaGooglePlay } from 'react-icons/fa'

interface AppStoreDownloadProps {
  appName: string
  appStoreUrl: string | null
  playStoreUrl: string | null
}

interface StoreCardProps {
  url: string
  ariaLabel: string
  qrTitle: string
  icon: ReactNode
  eyebrow: string
  label: string
}

// Single clickable promo tile: QR code (white, always-scannable background)
// on top, store icon + label below, one <a> for the whole card so any tap/
// click on it opens the store listing.
function StoreCard({ url, ariaLabel, qrTitle, icon, eyebrow, label }: StoreCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="flex flex-col items-center gap-4 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/[0.06] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-2xl"
    >
      <QRCodeSVG value={url} size={144} bgColor="#ffffff" fgColor="#111111" level="M" title={qrTitle} />

      <div className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-black px-4 py-2.5">
        {icon}
        <span className="flex flex-col text-left leading-none">
          <span
            className="whitespace-nowrap text-[11px] text-gray-300"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {eyebrow}
          </span>
          <span
            className="-mt-0.5 whitespace-nowrap text-lg font-semibold text-white"
            style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.01em' }}
          >
            {label}
          </span>
        </span>
      </div>
    </a>
  )
}

// Renders one combined QR + badge card per store the app is actually
// published on. appStoreUrl / playStoreUrl are both nullable (see
// src/data/apps.ts) — a null simply omits that store's card, and if both
// are null nothing renders at all. Kept as its own component so it can be
// absolutely positioned next to PhoneMockup without affecting the mockup's
// own centering — and generic over app name/URLs so other apps can reuse it.
export function AppStoreDownload({ appName, appStoreUrl, playStoreUrl }: AppStoreDownloadProps) {
  if (!appStoreUrl && !playStoreUrl) return null

  return (
    <div className="flex flex-col items-center gap-4">
      {appStoreUrl && (
        <StoreCard
          url={appStoreUrl}
          ariaLabel={`Download ${appName} on the App Store`}
          qrTitle={`QR code linking to the ${appName} App Store page`}
          icon={<FaApple size={26} className="flex-shrink-0 text-white" aria-hidden="true" />}
          eyebrow="Download on the"
          label="App Store"
        />
      )}

      {playStoreUrl && (
        <StoreCard
          url={playStoreUrl}
          ariaLabel={`Get ${appName} on Google Play`}
          qrTitle={`QR code linking to the ${appName} Google Play page`}
          icon={<FaGooglePlay size={22} className="flex-shrink-0 text-white" aria-hidden="true" />}
          eyebrow="Get it on"
          label="Google Play"
        />
      )}
    </div>
  )
}

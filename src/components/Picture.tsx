import { images, type ImageSlug } from '../lib/images.gen'

export type PictureProps = {
  slug: ImageSlug
  alt: string
  sizes?: string
  priority?: boolean
  class?: string
  pictureClass?: string
  dataSource?: 'client' | 'library' | 'shoot'
  dataSubject?: string
}

const buildSrcSet = (slug: ImageSlug, ext: 'avif' | 'webp' | 'jpg') =>
  images[slug].widths.map((w) => `/img/${slug}/${w}.${ext} ${w}w`).join(', ')

const fallbackSrc = (slug: ImageSlug) =>
  `/img/${slug}/${images[slug].jpegFallbackWidth}.jpg`

export function Picture(props: PictureProps) {
  return (
    <picture class={props.pictureClass}>
      <source
        type="image/avif"
        srcset={buildSrcSet(props.slug, 'avif')}
        sizes={props.sizes ?? '100vw'}
      />
      <source
        type="image/webp"
        srcset={buildSrcSet(props.slug, 'webp')}
        sizes={props.sizes ?? '100vw'}
      />
      <img
        src={fallbackSrc(props.slug)}
        alt={props.alt}
        width={images[props.slug].width}
        height={images[props.slug].height}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding={props.priority ? 'sync' : 'async'}
        fetchpriority={props.priority ? 'high' : undefined}
        class={props.class}
        data-source={props.dataSource ?? 'client'}
        data-subject={props.dataSubject ?? props.alt}
      />
    </picture>
  )
}

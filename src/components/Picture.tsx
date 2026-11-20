import { images, type ImageSlug } from '../lib/images.gen'

export type PictureProps = {
  slug: ImageSlug
  alt: string
  sizes?: string
  priority?: boolean
  class?: string
  pictureClass?: string
}

const buildSrcSet = (slug: ImageSlug, ext: 'avif' | 'webp' | 'jpg') =>
  images[slug].widths.map((w) => `/img/${slug}/${w}.${ext} ${w}w`).join(', ')

const fallbackSrc = (slug: ImageSlug) => {
  const ws = images[slug].widths
  return `/img/${slug}/${ws[ws.length - 1]}.jpg`
}

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
        srcset={buildSrcSet(props.slug, 'jpg')}
        sizes={props.sizes ?? '100vw'}
        alt={props.alt}
        width={images[props.slug].width}
        height={images[props.slug].height}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding={props.priority ? 'sync' : 'async'}
        fetchpriority={props.priority ? 'high' : undefined}
        class={props.class}
        style={{
          'background-image': `url(${images[props.slug].lqip})`,
          'background-size': 'cover',
        }}
      />
    </picture>
  )
}

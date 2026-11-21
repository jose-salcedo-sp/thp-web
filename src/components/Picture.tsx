import { images, type ImageSlug } from '../lib/images.gen'

/**
 * How the `<picture>` sits in its kit slot (the kit styles a bare `<img>`):
 * `cover` fills a sized box, `fill` lies absolute under a `.panel` or `.frame`,
 * `hero` is the `.hero--photo` background.
 */
export type PictureLayout = 'cover' | 'fill' | 'hero'

export type PictureProps = {
  slug: ImageSlug
  alt: string
  sizes?: string
  priority?: boolean
  layout?: PictureLayout
  class?: string
  pictureClass?: string
  dataSource?: 'client' | 'library' | 'shoot'
  dataSubject?: string
}

const layouts: Record<PictureLayout, { picture: string; img?: string }> = {
  cover: { picture: 'block size-full', img: 'block size-full object-cover' },
  fill: {
    picture: 'absolute inset-0 z-0 block size-full',
    img: 'block size-full object-cover',
  },
  hero: {
    picture:
      'hero__bg block overflow-hidden max-lg:top-(--nav) max-lg:bottom-auto max-lg:h-(--photo)',
  },
}

const buildSrcSet = (slug: ImageSlug, ext: 'avif' | 'webp' | 'jpg') =>
  images[slug].widths.map((w) => `/img/${slug}/${w}.${ext} ${w}w`).join(', ')

const fallbackSrc = (slug: ImageSlug) =>
  `/img/${slug}/${images[slug].jpegFallbackWidth}.jpg`

export function Picture(props: PictureProps) {
  const layout = () => (props.layout ? layouts[props.layout] : undefined)
  return (
    <picture class={[layout()?.picture, props.pictureClass]}>
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
        class={[layout()?.img, props.class]}
        data-source={props.dataSource ?? 'client'}
        data-subject={props.dataSubject ?? props.alt}
      />
    </picture>
  )
}

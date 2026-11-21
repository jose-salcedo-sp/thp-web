import type { ImageSlug } from '../lib/images.gen'
import { Picture } from './Picture'

/**
 * One hero for every route: the photograph is a band under the header,
 * and the words sit on the ground beneath it. Short h1, one fact, one action.
 * The kit's `.hero--photo` still draws the band below `lg`; these utilities
 * keep that same band on desktop so nothing sits in a box on the picture.
 */
const section =
  'hero hero--photo bg-ground lg:[--photo:min(54svh,540px)] sm:max-lg:[--photo:60svh] [@media(max-width:639px)_and_(min-height:701px)]:[--photo:50svh]'

const band =
  'lg:top-(--nav) lg:right-0 lg:bottom-auto lg:left-0 lg:h-(--photo) lg:w-full'

const copy =
  'lg:w-full lg:bg-transparent lg:p-0 lg:rounded-none'

const title =
  'max-w-none text-[length:clamp(36px,2.2vw_+_28px,64px)] leading-[1.05]'

export function Hero(props: {
  id: string
  headingId: string
  title: string
  line: string
  href: string
  slug: ImageSlug
  alt: string
  source?: 'client' | 'library' | 'shoot'
}) {
  return (
    <section
      class={section}
      id={props.id}
      data-enter=""
      aria-labelledby={props.headingId}
    >
      <Picture
        slug={props.slug}
        layout="hero"
        pictureClass={band}
        alt={props.alt}
        priority
        sizes="100vw"
        dataSource={props.source}
      />
      <div class="wrap">
        <div class="hero-text lg:justify-start">
          <div class={['hero__text', copy]}>
            <h1 id={props.headingId} class={title}>
              {props.title}
            </h1>
            <p class="hero__lead tabular-nums">{props.line}</p>
            <div class="btn-row">
              <a class="btn btn--primary" href={props.href}>
                Solicitar cotización
                <svg class="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path class="m-arrow__stem" d="M1 6h8" />
                  <path class="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

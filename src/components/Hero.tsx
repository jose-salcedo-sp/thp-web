import type { ImageSlug } from '../lib/images.gen'
import { Picture } from './Picture'

/**
 * One hero. From 640px up the photograph is full-bleed and the short copy
 * sits in a solid panel at the lower left. On a phone the photograph stays
 * a band under the header and the words sit on the ground beneath it.
 */
const section =
  'hero hero--photo bg-ground sm:max-lg:[--photo:0px] [@media(max-width:639px)_and_(min-height:701px)]:[--photo:50svh]'

const bleed =
  'sm:max-lg:top-0 sm:max-lg:right-0 sm:max-lg:bottom-0 sm:max-lg:left-0 sm:max-lg:h-full sm:max-lg:w-full'

const panel =
  'sm:max-lg:w-[min(100%,36rem)] sm:max-lg:bg-ground sm:max-lg:p-6 sm:max-lg:rounded-lg'

const title =
  'max-w-none text-[length:clamp(36px,2.2vw_+_28px,56px)] leading-[1.05]'

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
        pictureClass={bleed}
        alt={props.alt}
        priority
        sizes="100vw"
        dataSource={props.source}
      />
      <div class="wrap">
        <div class="hero-text sm:max-lg:justify-end">
          <div class={['hero__text', panel]}>
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

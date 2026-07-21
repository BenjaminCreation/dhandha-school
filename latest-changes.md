# Latest Changes — `fix-testimonials`

## Payment Funnel (Backend + Frontend)
- **Duplicate-submission guard**: `hasActiveOrder` ref prevents double clicks on "Get started" and duplicate Razorpay orders
- **Field validation**: Name/email required and email format check before creating order
- **Signature verification**: Payment signature verified server-side after Razorpay success
- **Polling UX**: Improved messaging while polling for payment status after modal dismiss
- **Stuck-user fix**: `hasActiveOrder` ref properly reset in `modal.ondismiss` and `payment.failed` handlers
- **CORS hardening**: Worker restricted to explicit domains (`BenjaminCreation.github.io`, `dhandhaschool.in`)
- **Body size limit**: 10kb limit on order creation endpoint
- **Payment ID constraint**: Fixed `payment_id` NOT NULL constraint violation in server
- **Status guard**: `UPDATE` on payments requires valid current status (pending)

## Scroll & UX
- **Menu overlay scroll-lock**: ScrollSmoother paused when full-screen menu opens, `overflow: hidden` on body as fallback; properly restored on close with sticker-phase conflict guard
- **Sticker-phase scroll lock**: Scroll locked on page load until all 6 hero sticker images are revealed via scroll accumulation
- **Scroll re-lock removed**: Once sticker phase completes, scrolling back to top no longer re-locks scroll
- **Internal scroll on curriculum**: Added overflow scroll to prevent content cut-off on shorter screens
- **Autofocus on checkout**: Checkout form inputs get keyboard focus; improved focus states across modals

## CSS & Layout
- **Testimonial card clipping**: Fixed cards being cut off on both desktop and mobile
- **Horizontal scroll alignment**: Fixed section alignment in horizontal scroll panels (why, masterclass, whatsnext)
- **Instructor section backgrounds**: Fixed overlay backgrounds; scoped images to instructor component only
- **Curriculum grid**: Changed to 2x2 grid on desktop to save vertical space
- **Story-stage alignment**: Enforced consistent container alignment across all sections
- **Dead CSS removed**: ~182 lines of unused CSS removed (`.cutout-laptop`, dropdown styles, teal styles, RotatingText)
- **Media queries consolidated**: Duplicate 768px blocks merged
- **Pricing card layout**: Fixed layout and alignment

## Removed Components
- **RotatingText.jsx / RotatingText.css**: Deleted (unused component)

## Accessibility
- **FAQ keyboard accessibility**: FAQ items navigable and toggleable via keyboard
- **Modal keyboard focus**: Payment modal traps focus and restores on close
- **Autofocus**: Checkout form auto-focuses on name input

## SEO
- **Meta tags**: Added/improved Open Graph, Twitter Card, and description meta tags in `index.html`

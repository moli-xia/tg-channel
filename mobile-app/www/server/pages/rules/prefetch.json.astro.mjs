export { renderers } from '../../renderers.mjs';

async function GET() {
  return Response.json({
    prerender: [
      {
        urls: ['/', '/tags'],
        eagerness: 'eager',
      },
    ],
    prefetch: [
      {
        where: { href_matches: ['/posts/*'] },
        eagerness: 'moderate',
      },
    ],
  }, {
    headers: {
      'Content-Type': 'application/speculationrules+json',
    },
  })
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

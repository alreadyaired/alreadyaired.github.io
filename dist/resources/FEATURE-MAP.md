# EN3 feature map and integration boundaries

| Experience | This isolated build | Production integration needed |
|---|---|---|
| Home and discovery | EN3 content, Champ design, working category filters | Live catalogue feed |
| Journal | Five full captured articles and index | Editorial CMS |
| Bandipur | Home, about, policies, safari page | Organiser inventory service |
| Safari | Date, session, vehicle, party counts, visitor fields, booking summary | Atomic seat holds, real tariffs, availability, ID handling, authenticated contact verification |
| Payments | Explicit demo completion only | Payment gateway, signed webhook, idempotent ledger, expiry and refund processing |
| My tickets | Fictional local sign-in with demo code 123456 | Rate-limited OTP, secure sessions, authorised ticket lookup |
| Partner fees | Working calculator with published pricing assumptions | Current commercial rules |
| Partner request | Validation and local acknowledgement | CRM/contact service with consent and retention controls |
| Counter, trips, gate, settlement | Public descriptions and reference screenshots | Private partner/admin application; no accounts or records were copied |
| Passes | Watermarked non-admission demo | Signed ticket codes, party entry rules, delivery service |

## What to retain when building the production backend
Keep online and counter capacity in one transaction-controlled inventory. Never let the browser set authoritative price, taxes, discounts, availability, or check-in state. Use expiring seat holds, signed payment callbacks, idempotency keys, audit trails, role-based partner access, and per-organiser data isolation. Connect real services only in a separately reviewed staging environment first.

The source's Bandipur fare snapshot displayed ₹2 and 69 seats. Those values are captured display data, not confirmed current commercial rates. The demo uses that captured fare only with explicit prototype labels.

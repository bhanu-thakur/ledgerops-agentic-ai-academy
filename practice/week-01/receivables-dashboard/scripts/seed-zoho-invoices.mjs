/**
 * Seed realistic customers and invoices into live Zoho Books organization.
 */

const TOKEN = '1000.713cc9a88b215957afe966fecefd97fe.126743291e97061de804bec4e73ce28d';
const ORG_ID = '60088191853';
const SALES_ACCOUNT_ID = '4135139000000000486';

const customersData = [
  { name: 'Infosys Digital Solutions', company: 'Infosys Ltd', email: 'billing@infosys.demo' },
  { name: 'Reliance Retail Operations', company: 'Reliance Retail Ltd', email: 'finance@reliance.demo' },
  { name: 'Wipro Infrastructure Systems', company: 'Wipro Technologies', email: 'accounts@wipro.demo' },
  { name: 'HCL Tech Consulting', company: 'HCL Technologies', email: 'invoices@hcl.demo' },
  { name: 'Mahindra Supply Chain', company: 'Mahindra Logistics Ltd', email: 'ar@mahindra.demo' },
  { name: 'Bharti Airtel Telecom', company: 'Bharti Airtel Ltd', email: 'ap@airtel.demo' },
  { name: 'Zomato Quick Commerce', company: 'Zomato Ltd', email: 'finance@zomato.demo' },
  { name: 'Swiggy Delivery Logistics', company: 'Bundl Technologies', email: 'ops@swiggy.demo' },
  { name: 'Flipkart Fulfillment Centers', company: 'Flipkart India Pvt Ltd', email: 'vendor@flipkart.demo' },
];

const invoicesBlueprint = [
  // Current / Due in Future
  { customerIdx: 0, date: '2026-08-25', dueDate: '2026-09-25', item: 'AI Workflow Integration', rate: 75000 },
  { customerIdx: 1, date: '2026-08-28', dueDate: '2026-09-30', item: 'Enterprise ERP Maintenance', rate: 120000 },
  { customerIdx: 2, date: '2026-09-01', dueDate: '2026-10-05', item: 'DevOps Cloud Optimization', rate: 55000 },
  
  // 1-30 Days Overdue (assuming as-of late August/Sept)
  { customerIdx: 3, date: '2026-08-01', dueDate: '2026-08-20', item: 'Data Pipeline Engineering', rate: 64000 },
  { customerIdx: 4, date: '2026-08-05', dueDate: '2026-08-25', item: 'Fleet Telematics Subscription', rate: 38000 },
  { customerIdx: 5, date: '2026-08-10', dueDate: '2026-08-28', item: 'Fiber Network Bandwidth', rate: 92000 },

  // 31-60 Days Overdue
  { customerIdx: 6, date: '2026-07-01', dueDate: '2026-07-20', item: 'Merchant Payment Gateway Retainer', rate: 48000 },
  { customerIdx: 7, date: '2026-07-10', dueDate: '2026-07-28', item: 'Last-Mile Routing Algorithms', rate: 85000 },

  // 61-90 Days Overdue
  { customerIdx: 8, date: '2026-06-01', dueDate: '2026-06-20', item: 'Warehouse Automation Consulting', rate: 145000 },
  { customerIdx: 0, date: '2026-06-15', dueDate: '2026-06-30', item: 'Security Audit & Compliance Review', rate: 60000 },

  // Over 90 Days Overdue
  { customerIdx: 1, date: '2026-04-15', dueDate: '2026-05-15', item: 'POS Hardware Integration Phase 1', rate: 180000 },
  { customerIdx: 2, date: '2026-05-01', dueDate: '2026-05-25', item: 'Legacy Database Migration', rate: 110000 },
];

async function main() {
  console.log('--- Step 1: Creating Customers in Zoho Books ---');
  const customerIds = [];

  for (const c of customersData) {
    const res = await fetch(`https://www.zohoapis.in/books/v3/contacts?organization_id=${ORG_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact_name: c.name,
        company_name: c.company,
        contact_type: 'customer',
        email: c.email,
        currency_id: '4135139000000000064', // INR
      }),
    });

    const json = await res.json();
    if (json.code === 0) {
      console.log(`✔ Created Customer: ${json.contact.contact_name} (ID: ${json.contact.contact_id})`);
      customerIds.push(json.contact.contact_id);
    } else {
      console.error(`✖ Error creating ${c.name}:`, json.message);
    }
    // Rate limit pause
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log('\n--- Step 2: Creating Invoices with Diverse Aging Buckets ---');
  let createdCount = 0;

  for (let i = 0; i < invoicesBlueprint.length; i++) {
    const bp = invoicesBlueprint[i];
    const custId = customerIds[bp.customerIdx] || '4135139000000038001';

    const res = await fetch(`https://www.zohoapis.in/books/v3/invoices?organization_id=${ORG_ID}`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: custId,
        date: bp.date,
        due_date: bp.dueDate,
        line_items: [
          {
            name: bp.item,
            rate: bp.rate,
            quantity: 1,
            account_id: SALES_ACCOUNT_ID,
          },
        ],
      }),
    });

    const json = await res.json();
    if (json.code === 0) {
      createdCount++;
      console.log(`✔ [${createdCount}/12] Invoice ${json.invoice.invoice_number}: ₹${json.invoice.total} (Due: ${bp.dueDate})`);
    } else {
      console.error(`✖ Failed invoice #${i + 1}:`, json.message);
    }
    await new Promise((r) => setTimeout(r, 600));
  }

  console.log(`\n🎉 Successfully seeded ${createdCount} live invoices into Zoho Books!`);
}

main().catch(console.error);

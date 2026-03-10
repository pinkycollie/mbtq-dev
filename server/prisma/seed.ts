import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  console.log('Cleaning up existing data...');
  await prisma.webhookEvent.deleteMany();
  await prisma.requestStatusLog.deleteMany();
  await prisma.project.deleteMany();
  await prisma.bid.deleteMany();
  await prisma.request.deleteMany();
  await prisma.creator.deleteMany();
  await prisma.company.deleteMany();

  // Create companies
  console.log('Creating companies...');
  const company1 = await prisma.company.create({
    data: {
      name: 'Tech Corp Inc',
      email: 'contact@techcorp.com',
      apiKey: 'test-api-key-' + crypto.randomBytes(16).toString('hex'),
      webhookUrl: 'https://videos.mbtq.dev/webhooks/techcorp',
      isActive: true,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Media Solutions LLC',
      email: 'hello@mediasolutions.com',
      apiKey: 'test-api-key-' + crypto.randomBytes(16).toString('hex'),
      webhookUrl: 'https://videos.mbtq.dev/webhooks/media',
      isActive: true,
    },
  });

  console.log(`✅ Created companies with API keys:`);
  console.log(`   ${company1.name}: ${company1.apiKey}`);
  console.log(`   ${company2.name}: ${company2.apiKey}`);

  // Create creators
  console.log('Creating creators...');
  const creator1 = await prisma.creator.create({
    data: {
      name: 'Alex Johnson',
      email: 'alex@creators.pinksync.io',
      skills: ['ASL', 'video-editing', 'captioning'],
      isVerified: true,
      isAvailable: true,
      rating: 4.8,
      completedProjects: 15,
    },
  });

  const creator2 = await prisma.creator.create({
    data: {
      name: 'Jamie Lee',
      email: 'jamie@creators.pinksync.io',
      skills: ['BSL', 'video-editing'],
      isVerified: true,
      isAvailable: true,
      rating: 4.9,
      completedProjects: 23,
    },
  });

  const creator3 = await prisma.creator.create({
    data: {
      name: 'Morgan Davis',
      email: 'morgan@creators.pinksync.io',
      skills: ['ASL', 'BSL', 'captioning', 'translation'],
      isVerified: true,
      isAvailable: true,
      rating: 5.0,
      completedProjects: 45,
    },
  });

  const creator4 = await prisma.creator.create({
    data: {
      name: 'Casey Martinez',
      email: 'casey@creators.pinksync.io',
      skills: ['video-editing', 'motion-graphics'],
      isVerified: false,
      isAvailable: true,
      rating: 4.5,
      completedProjects: 8,
    },
  });

  console.log(`✅ Created ${4} creators`);

  // Create requests
  console.log('Creating video requests...');
  const request1 = await prisma.request.create({
    data: {
      companyId: company1.id,
      title: 'ASL Interpretation for Product Launch Video',
      description: 'We need a professional ASL interpreter for our 5-minute product launch video.',
      requirements: {
        skills: ['ASL', 'video-editing'],
        quality: 'professional',
        duration: '5 minutes',
      },
      serviceType: 'sign-language',
      budget: 500,
      deadline: new Date('2025-12-31'),
      status: 'OPEN_FOR_BIDS',
    },
  });

  await prisma.requestStatusLog.create({
    data: {
      requestId: request1.id,
      oldStatus: null,
      newStatus: 'OPEN_FOR_BIDS',
      changedBy: company1.id,
      notes: 'Request created and opened for bids',
    },
  });

  const request2 = await prisma.request.create({
    data: {
      companyId: company1.id,
      title: 'Captioning for Training Videos',
      description: 'Need captions for 10 training videos, each 3-5 minutes long.',
      requirements: {
        skills: ['captioning'],
        quantity: 10,
        languages: ['English'],
      },
      serviceType: 'captioning',
      budget: 800,
      deadline: new Date('2026-01-15'),
      status: 'OPEN_FOR_BIDS',
    },
  });

  await prisma.requestStatusLog.create({
    data: {
      requestId: request2.id,
      oldStatus: null,
      newStatus: 'OPEN_FOR_BIDS',
      changedBy: company1.id,
      notes: 'Request created',
    },
  });

  const request3 = await prisma.request.create({
    data: {
      companyId: company2.id,
      title: 'BSL Video for Marketing Campaign',
      description: 'BSL interpretation for marketing video targeting UK audience.',
      requirements: {
        skills: ['BSL', 'video-editing'],
        targetMarket: 'UK',
        duration: '3 minutes',
      },
      serviceType: 'sign-language',
      budget: 450,
      status: 'PENDING',
    },
  });

  await prisma.requestStatusLog.create({
    data: {
      requestId: request3.id,
      oldStatus: null,
      newStatus: 'PENDING',
      changedBy: company2.id,
      notes: 'Request created',
    },
  });

  console.log(`✅ Created ${3} requests`);

  // Create bids
  console.log('Creating bids...');
  const bid1 = await prisma.bid.create({
    data: {
      requestId: request1.id,
      creatorId: creator1.id,
      amount: 480,
      proposal: 'I have extensive experience in ASL interpretation for product videos. I can deliver high-quality work within your timeline.',
      estimatedDays: 7,
      status: 'PENDING',
    },
  });

  const bid2 = await prisma.bid.create({
    data: {
      requestId: request1.id,
      creatorId: creator3.id,
      amount: 500,
      proposal: 'With 45+ completed projects and a 5.0 rating, I can provide professional ASL interpretation with expert video editing.',
      estimatedDays: 5,
      status: 'PENDING',
    },
  });

  const bid3 = await prisma.bid.create({
    data: {
      requestId: request2.id,
      creatorId: creator1.id,
      amount: 750,
      proposal: 'I specialize in captioning services and can handle all 10 videos efficiently with quick turnaround.',
      estimatedDays: 10,
      status: 'PENDING',
    },
  });

  const bid4 = await prisma.bid.create({
    data: {
      requestId: request2.id,
      creatorId: creator3.id,
      amount: 800,
      proposal: 'Expert captioning with multiple language support. Quality guaranteed.',
      estimatedDays: 8,
      status: 'PENDING',
    },
  });

  console.log(`✅ Created ${4} bids`);

  // Create a completed project
  console.log('Creating sample completed project...');
  const completedRequest = await prisma.request.create({
    data: {
      companyId: company2.id,
      title: 'Video Editing for Company Introduction',
      description: 'Edit and polish our company introduction video.',
      requirements: {
        skills: ['video-editing'],
        length: '2 minutes',
      },
      serviceType: 'video-editing',
      budget: 300,
      status: 'COMPLETED',
    },
  });

  await prisma.requestStatusLog.createMany({
    data: [
      {
        requestId: completedRequest.id,
        oldStatus: null,
        newStatus: 'PENDING',
        changedBy: company2.id,
        notes: 'Request created',
      },
      {
        requestId: completedRequest.id,
        oldStatus: 'PENDING',
        newStatus: 'BID_ACCEPTED',
        changedBy: company2.id,
        notes: 'Accepted bid from creator',
      },
      {
        requestId: completedRequest.id,
        oldStatus: 'BID_ACCEPTED',
        newStatus: 'COMPLETED',
        changedBy: creator2.id,
        notes: 'Project completed and delivered',
      },
    ],
  });

  const completedProject = await prisma.project.create({
    data: {
      requestId: completedRequest.id,
      creatorId: creator2.id,
      status: 'APPROVED',
      startedAt: new Date('2025-11-15'),
      completedAt: new Date('2025-11-22'),
      deliverableUrl: 'https://storage.pinksync.io/deliverables/sample-video.mp4',
      notes: 'Successfully delivered edited video with all requested changes.',
    },
  });

  console.log(`✅ Created completed project`);

  console.log('\n🎉 Database seed completed successfully!');
  console.log('\n📝 Summary:');
  console.log(`   Companies: ${2}`);
  console.log(`   Creators: ${4}`);
  console.log(`   Requests: ${4}`);
  console.log(`   Bids: ${4}`);
  console.log(`   Projects: ${1}`);

  console.log('\n🔑 API Keys for testing:');
  console.log(`   Company 1: ${company1.apiKey}`);
  console.log(`   Company 2: ${company2.apiKey}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

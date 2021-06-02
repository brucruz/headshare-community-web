process.env.NODE_ENV = 'test';

process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['headshare.s3.amazonaws.com', 'example.com'],
    path: '/_next/image',
    loader: 'default',
  },
};

const { existsSync, unlinkSync } = require('fs');

if (!/yarn/.test(process.env.npm_execpath || '')) {
  console.error(
    '\x1b[31mThis project uses yarn as package manager. Please use yarn to ensure no lock file collision occurs.\x1b[0m',
  );

  const lockFile = 'package-lock.json';
  if (existsSync(lockFile)) {
    try {
      unlinkSync(lockFile);
      console.warn(
        '\x1b[33mWarning: package-lock.json was found and removed.\x1b[0m',
      );
    } catch (error) {
      console.error(
        '\x1b[31mError removing package-lock.json. Please delete it manually.\x1b[0m',
      );
    }
  }

  process.exit(1);
}

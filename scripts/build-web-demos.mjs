import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const workspace = join(root, '..')
const guestGuideDir = join(workspace, 'nogvia_guest-guide')
const financeDir = join(workspace, 'nogvia_finance')
const demoRoot = join(root, 'public', 'demo')
const guestDemoIndex = join(demoRoot, 'guest-guide', 'index.html')
const financeDemoIndex = join(demoRoot, 'finance', 'index.html')

function run(command, cwd) {
  execSync(command, { cwd, stdio: 'inherit', shell: true })
}

function hasCommittedDemos() {
  return existsSync(guestDemoIndex) && existsSync(financeDemoIndex)
}

if (process.env.SKIP_WEB_DEMOS === '1') {
  if (hasCommittedDemos()) {
    console.log('SKIP_WEB_DEMOS=1 — using committed demo bundles in public/demo/.')
  } else {
    console.warn('SKIP_WEB_DEMOS=1 but public/demo bundles are missing.')
  }
  process.exit(0)
}

// Hostinger (and other hosts) usually clone only nogviaweb — use committed bundles when sibling repos are absent.

const hasGuestGuideRepo = existsSync(join(guestGuideDir, 'package.json'))
const hasFinanceRepo = existsSync(join(financeDir, 'package.json'))

if (!hasGuestGuideRepo || !hasFinanceRepo) {
  if (hasCommittedDemos()) {
    console.log('Sibling app repos not found — using committed demo bundles in public/demo/.')
    process.exit(0)
  }

  throw new Error(
    'Missing nogvia_guest-guide or nogvia_finance repo, and no committed demo bundles in public/demo/.',
  )
}

console.log('Building Guest Guide web demo…')
run('npm run build:web-demo', guestGuideDir)

console.log('Building Finance web demo…')
run('npm run build:web-demo', financeDir)

rmSync(join(demoRoot, 'guest-guide'), { recursive: true, force: true })
rmSync(join(demoRoot, 'finance'), { recursive: true, force: true })
mkdirSync(demoRoot, { recursive: true })

cpSync(join(guestGuideDir, 'dist'), join(demoRoot, 'guest-guide'), { recursive: true })
cpSync(join(financeDir, 'dist'), join(demoRoot, 'finance'), { recursive: true })

console.log('Browser demos copied to public/demo/')

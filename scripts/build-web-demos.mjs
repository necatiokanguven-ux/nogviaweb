import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const workspace = join(root, '..')
const guestGuideDir = join(workspace, 'nogvia_guest-guide')
const financeDir = join(workspace, 'nogvia_finance')
const demoRoot = join(root, 'public', 'demo')

function run(command, cwd) {
  execSync(command, { cwd, stdio: 'inherit', shell: true })
}

if (process.env.SKIP_WEB_DEMOS === '1') {
  console.log('SKIP_WEB_DEMOS=1 — browser demo build skipped.')
  process.exit(0)
}

for (const [label, dir] of [
  ['nogvia_guest-guide', guestGuideDir],
  ['nogvia_finance', financeDir],
]) {
  if (!existsSync(join(dir, 'package.json'))) {
    throw new Error(`Missing ${label} at ${dir}. Set SKIP_WEB_DEMOS=1 to skip demo bundling.`)
  }
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

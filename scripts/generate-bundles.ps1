Param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Ensure output directory exists
$outDir = Join-Path -Path (Get-Location) -ChildPath 'docs/bundles'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Write-FileBlock([string]$BundlePath, [string]$FilePath, [string]$Lang) {
  if (-not (Test-Path $FilePath)) {
    throw "Missing file: $FilePath"
  }
  $header = "===== FILE: $FilePath =====`r`n```$Lang`r`n"
  $content = Get-Content -Raw -Path $FilePath
  $footer = "`r`n````r`n"
  Add-Content -Path $BundlePath -Value ($header + $content + $footer)
}

function New-Bundle([string]$BundleName, $Files) {
  $bundlePath = Join-Path $outDir $BundleName
  if (Test-Path $bundlePath) { Remove-Item $bundlePath -Force }
  New-Item -ItemType File -Path $bundlePath | Out-Null
  foreach ($f in $Files) {
    Write-FileBlock -BundlePath $bundlePath -FilePath $f.Path -Lang $f.Lang
  }
  Write-Host "Generated $BundleName"
}

# Bundle 1
$bundle1 = @(
  @{ Path = 'package.json'; Lang = 'json' },
  @{ Path = 'tsconfig.json'; Lang = 'json' },
  @{ Path = 'tailwind.config.js'; Lang = 'javascript' },
  @{ Path = 'postcss.config.js'; Lang = 'javascript' },
  @{ Path = 'src/index.tsx'; Lang = 'tsx' },
  @{ Path = 'src/App.tsx'; Lang = 'tsx' },
  @{ Path = 'src/pages/Landing.tsx'; Lang = 'tsx' },
  @{ Path = 'src/pages/Onboarding.tsx'; Lang = 'tsx' },
  @{ Path = 'src/pages/Assessment.tsx'; Lang = 'tsx' },
  @{ Path = 'src/pages/Dashboard.tsx'; Lang = 'tsx' }
)

# Bundle 2
$bundle2 = @(
  @{ Path = 'src/pages/UserSetup.tsx'; Lang = 'tsx' },
  @{ Path = 'src/contexts/AuthContext.tsx'; Lang = 'tsx' },
  @{ Path = 'src/contexts/OnboardingContext.tsx'; Lang = 'tsx' },
  @{ Path = 'src/contexts/AssessmentContext.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/OnboardingStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/WelcomeStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/BasicInfoStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/PreferencesStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/BoundariesStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/CompleteStep.tsx'; Lang = 'tsx' }
)

# Bundle 3
$bundle3 = @(
  @{ Path = 'src/components/onboarding/NavigationControls.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/ProgressIndicator.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/AssessmentHeader.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/ProgressIndicator.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/QuestionDisplay.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/PhaseTransition.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/MultipleChoiceQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/ScaleQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/TextQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/ImageChoiceQuestion.tsx'; Lang = 'tsx' }
)

# Bundle 4
$bundle4 = @(
  @{ Path = 'src/components/assessment/questions/BinaryQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/ScenarioQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/RankingQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/WordAssociationQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/assessment/questions/EmotionWheelQuestion.tsx'; Lang = 'tsx' },
  @{ Path = 'src/data/advancedQuestions.ts'; Lang = 'ts' },
  @{ Path = 'src/utils/index.ts'; Lang = 'ts' },
  @{ Path = 'src/index.css'; Lang = 'css' },
  @{ Path = 'src/types/index.ts'; Lang = 'ts' },
  @{ Path = 'src/types/framer-motion.d.ts'; Lang = 'ts' }
)

# Bundle 5
$bundle5 = @(
  @{ Path = 'src/types/hookform-resolvers.d.ts'; Lang = 'ts' },
  @{ Path = 'src/types/lucide-react.d.ts'; Lang = 'ts' },
  @{ Path = 'public/index.html'; Lang = 'html' },
  @{ Path = 'public/manifest.json'; Lang = 'json' },
  @{ Path = 'public/robots.txt'; Lang = 'txt' },
  @{ Path = 'README.md'; Lang = 'md' },
  @{ Path = 'env.example'; Lang = 'env' },
  @{ Path = 'src/reportWebVitals.ts'; Lang = 'ts' },
  @{ Path = 'src/setupTests.ts'; Lang = 'ts' },
  @{ Path = 'src/App.test.tsx'; Lang = 'tsx' }
)

# Bundle 6 (additional files)
$bundle6 = @(
  @{ Path = 'src/components/assessment/AssessmentComplete.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/InterestsStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/components/onboarding/steps/PrivacyStep.tsx'; Lang = 'tsx' },
  @{ Path = 'src/react-app-env.d.ts'; Lang = 'ts' }
)

New-Bundle -BundleName 'bundle-1.md' -Files $bundle1
New-Bundle -BundleName 'bundle-2.md' -Files $bundle2
New-Bundle -BundleName 'bundle-3.md' -Files $bundle3
New-Bundle -BundleName 'bundle-4.md' -Files $bundle4
New-Bundle -BundleName 'bundle-5.md' -Files $bundle5
New-Bundle -BundleName 'bundle-6.md' -Files $bundle6

Write-Host 'All bundles generated in docs/bundles'



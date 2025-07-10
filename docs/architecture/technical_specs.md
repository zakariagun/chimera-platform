# 🔧 المواصفات التقنية المفصلة - منصة Chimera

## 📋 نظرة عامة تقنية

هذا المستند يحتوي على جميع التفاصيل التقنية المطلوبة لبناء منصة Chimera بدقة واحترافية.

---

## 🏗️ بنية المشروع

### هيكل المجلدات المطلوب:
```
chimera-platform/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/         # مكونات React قابلة للاستخدام
│   │   ├── ui/            # مكونات UI أساسية
│   │   ├── forms/         # نماذج ومدخلات
│   │   └── layout/        # تخطيط الصفحات
│   ├── pages/             # صفحات التطبيق
│   │   ├── Dashboard.tsx
│   │   ├── ProjectCreate.tsx
│   │   ├── ProjectWorkflow.tsx
│   │   ├── APIManagement.tsx
│   │   └── Settings.tsx
│   ├── hooks/             # React Hooks مخصصة
│   ├── services/          # خدمات APIs والمنطق
│   │   ├── ai/           # خدمات الذكاء الاصطناعي
│   │   ├── supabase/     # تكامل Supabase
│   │   └── prompts/      # محركات التلقينات
│   ├── types/             # تعريفات TypeScript
│   ├── utils/             # وظائف مساعدة
│   ├── stores/            # Zustand stores
│   ├── styles/            # ملفات CSS
│   └── App.tsx
├── supabase/
│   ├── migrations/        # ملفات قاعدة البيانات
│   ├── functions/         # Edge Functions
│   └── seed.sql          # بيانات أولية
├── docs/                  # الوثائق
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🗄️ تصميم قاعدة البيانات المفصل

### 1. جدول المستخدمين (users)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    subscription_plan subscription_plan_enum DEFAULT 'free',
    subscription_expires_at TIMESTAMP,
    total_projects INTEGER DEFAULT 0,
    total_prompts_generated INTEGER DEFAULT 0,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- إنشاء الفهارس
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_plan);
```

### 2. جدول مفاتيح APIs (api_keys)
```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider api_provider_enum NOT NULL,
    key_name VARCHAR(100) NOT NULL,
    encrypted_api_key TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    rate_limit_remaining INTEGER DEFAULT 1000,
    rate_limit_reset_at TIMESTAMP,
    last_used_at TIMESTAMP,
    error_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, provider, key_name)
);

-- Enums
CREATE TYPE api_provider_enum AS ENUM ('google_ai_studio', 'openrouter');
CREATE TYPE subscription_plan_enum AS ENUM ('free', 'pro', 'enterprise');
```

### 3. جدول المشاريع (projects)
```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    initial_idea TEXT NOT NULL,
    project_type project_type_enum NOT NULL,
    target_platforms TEXT[] DEFAULT '{}',
    status project_status_enum DEFAULT 'idea',
    current_stage INTEGER DEFAULT 1,
    total_stages INTEGER DEFAULT 7,
    style_preferences JSONB DEFAULT '{}',
    quality_settings JSONB DEFAULT '{"min_score": 8.0}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TYPE project_type_enum AS ENUM ('video', 'audio', 'image', 'mixed', 'commercial', 'educational', 'entertainment');
CREATE TYPE project_status_enum AS ENUM ('idea', 'script', 'prompts', 'review', 'completed', 'exported', 'archived');

-- الفهارس
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### 4. جدول مراحل العمل (workflow_stages)
```sql
CREATE TABLE workflow_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    stage_number INTEGER NOT NULL,
    stage_name VARCHAR(100) NOT NULL,
    stage_type stage_type_enum NOT NULL,
    input_data JSONB DEFAULT '{}',
    output_data JSONB DEFAULT '{}',
    ai_model_used VARCHAR(100),
    processing_time_ms INTEGER,
    tokens_consumed INTEGER DEFAULT 0,
    status stage_status_enum DEFAULT 'pending',
    quality_score DECIMAL(3,2),
    user_feedback TEXT,
    auto_approved BOOLEAN DEFAULT false,
    retry_count INTEGER DEFAULT 0,
    error_details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    approved_at TIMESTAMP,
    
    UNIQUE(project_id, stage_number)
);

CREATE TYPE stage_type_enum AS ENUM (
    'idea_expansion', 'media_analysis', 'research', 'script_generation',
    'video_prompts', 'image_prompts', 'audio_prompts', 'music_prompts',
    'quality_review', 'capcut_guide', 'export'
);

CREATE TYPE stage_status_enum AS ENUM (
    'pending', 'in_progress', 'completed', 'approved', 'rejected', 'error', 'skipped'
);
```

### 5. جدول الشخصيات (characters)
```sql
CREATE TABLE characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    character_name VARCHAR(100) NOT NULL,
    character_role VARCHAR(100),
    physical_description TEXT NOT NULL,
    personality_traits TEXT,
    voice_characteristics JSONB DEFAULT '{}',
    visual_consistency_key TEXT NOT NULL, -- للحفاظ على التناسق البصري
    voice_consistency_key TEXT, -- للحفاظ على تناسق الصوت
    appearance_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(project_id, character_name)
);

-- فهرس للبحث السريع
CREATE INDEX idx_characters_project_id ON characters(project_id);
```

### 6. جدول التلقينات المولدة (generated_prompts)
```sql
CREATE TABLE generated_prompts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    stage_id UUID NOT NULL REFERENCES workflow_stages(id) ON DELETE CASCADE,
    prompt_type prompt_type_enum NOT NULL,
    target_platform VARCHAR(50) NOT NULL,
    scene_number INTEGER,
    scene_title VARCHAR(255),
    prompt_text TEXT NOT NULL,
    prompt_parameters JSONB DEFAULT '{}',
    technical_settings JSONB DEFAULT '{}',
    character_id UUID REFERENCES characters(id),
    quality_score DECIMAL(3,2),
    estimated_duration INTEGER, -- بالثواني للفيديو/الصوت
    estimated_tokens INTEGER,
    usage_count INTEGER DEFAULT 0,
    user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
    user_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE prompt_type_enum AS ENUM (
    'video', 'image', 'audio_dialogue', 'audio_narration', 
    'music', 'sound_effects', 'character_description'
);

-- فهارس للأداء
CREATE INDEX idx_prompts_project_id ON generated_prompts(project_id);
CREATE INDEX idx_prompts_type ON generated_prompts(prompt_type);
CREATE INDEX idx_prompts_platform ON generated_prompts(target_platform);
```

### 7. جدول الوسائط المرفوعة (uploaded_media)
```sql
CREATE TABLE uploaded_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type media_type_enum NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    duration_seconds INTEGER, -- للفيديو/الصوت
    dimensions VARCHAR(20), -- للصور/الفيديو (مثل: "1920x1080")
    analysis_status analysis_status_enum DEFAULT 'pending',
    analysis_result JSONB DEFAULT '{}',
    analysis_error TEXT,
    is_reference BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    analyzed_at TIMESTAMP
);

CREATE TYPE media_type_enum AS ENUM ('image', 'video', 'audio');
CREATE TYPE analysis_status_enum AS ENUM ('pending', 'processing', 'completed', 'failed');

-- فهرس
CREATE INDEX idx_media_project_id ON uploaded_media(project_id);
```

### 8. جدول القوالب (templates)
```sql
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category template_category_enum NOT NULL,
    template_data JSONB NOT NULL,
    preview_image_url TEXT,
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES users(id),
    usage_count INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE template_category_enum AS ENUM (
    'marketing', 'educational', 'entertainment', 'documentary', 
    'social_media', 'corporate', 'personal'
);
```

---

## 🔌 تكامل APIs

### 1. Google AI Studio Integration
```typescript
// src/services/ai/googleAIStudio.ts
interface GoogleAIStudioConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

class GoogleAIStudioService {
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';
  
  async generateContent(prompt: string, config: GoogleAIStudioConfig): Promise<AIResponse> {
    const response = await fetch(`${this.baseURL}/models/${config.model}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': config.apiKey,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: config.temperature || 0.7,
          maxOutputTokens: config.maxTokens || 2048,
        }
      })
    });
    
    if (!response.ok) {
      throw new APIError(`Google AI Studio error: ${response.statusText}`);
    }
    
    return await response.json();
  }
  
  async generateSpeech(text: string, voiceConfig: VoiceConfig): Promise<AudioBuffer> {
    // تنفيذ تحويل النص إلى صوت
  }
}
```

### 2. OpenRouter Integration
```typescript
// src/services/ai/openRouter.ts
interface OpenRouterConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

class OpenRouterService {
  private baseURL = 'https://openrouter.ai/api/v1';
  
  async generateContent(prompt: string, config: OpenRouterConfig): Promise<AIResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Chimera Platform',
      },
      body: JSON.stringify({
        model: config.model,
        messages: [{
          role: 'user',
          content: prompt
        }],
        temperature: config.temperature || 0.7,
        max_tokens: config.maxTokens || 2048,
      })
    });
    
    if (!response.ok) {
      throw new APIError(`OpenRouter error: ${response.statusText}`);
    }
    
    return await response.json();
  }
}
```

### 3. Unified AI Service
```typescript
// src/services/ai/unifiedAI.ts
interface AIServiceConfig {
  provider: 'google_ai_studio' | 'openrouter';
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

class UnifiedAIService {
  private googleService = new GoogleAIStudioService();
  private openRouterService = new OpenRouterService();
  
  async generateContent(prompt: string, config: AIServiceConfig): Promise<AIResponse> {
    try {
      switch (config.provider) {
        case 'google_ai_studio':
          return await this.googleService.generateContent(prompt, config);
        case 'openrouter':
          return await this.openRouterService.generateContent(prompt, config);
        default:
          throw new Error(`Unsupported provider: ${config.provider}`);
      }
    } catch (error) {
      // تسجيل الخطأ وإدارة الـ fallback
      throw new AIServiceError(error.message, config.provider);
    }
  }
}
```

---

## 🧠 محركات التلقينات

### 1. محرك تلقينات الفيديو (Veo3)
```typescript
// src/services/prompts/videoPromptEngine.ts
interface VideoScene {
  id: string;
  title: string;
  description: string;
  characters: Character[];
  environment: string;
  action: string;
  emotion: string;
  duration: number;
}

interface VideoPromptSettings {
  style: 'cinematic' | 'documentary' | 'commercial' | 'social_media';
  quality: 'standard' | 'high' | 'ultra';
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
  duration: number;
}

class VideoPromptEngine {
  private styleTemplates = {
    cinematic: {
      lighting: 'cinematic lighting, dramatic shadows',
      camera: 'professional cinematography, smooth camera movements',
      quality: 'high production value, film-grade quality'
    },
    documentary: {
      lighting: 'natural lighting, authentic feel',
      camera: 'handheld camera, realistic movement',
      quality: 'documentary style, observational'
    },
    commercial: {
      lighting: 'bright, even lighting',
      camera: 'stable shots, dynamic angles',
      quality: 'commercial production, polished'
    },
    social_media: {
      lighting: 'trendy lighting, high contrast',
      camera: 'dynamic shots, quick cuts',
      quality: 'social media optimized, engaging'
    }
  };
  
  generateVideoPrompt(scene: VideoScene, settings: VideoPromptSettings): string {
    const style = this.styleTemplates[settings.style];
    const characterDesc = this.buildCharacterDescription(scene.characters);
    const environmentDesc = this.enhanceEnvironmentDescription(scene.environment);
    const actionDesc = this.buildActionDescription(scene.action, scene.emotion);
    const technicalParams = this.buildTechnicalParameters(settings);
    
    return `${characterDesc} ${actionDesc} in ${environmentDesc}. 
            Camera: ${style.camera}, ${this.getCameraWork(scene.action)}.
            Lighting: ${style.lighting}.
            Style: ${style.quality}, ${technicalParams}.
            Duration: ${settings.duration} seconds.`;
  }
  
  private buildCharacterDescription(characters: Character[]): string {
    return characters.map(char => 
      `${char.name}: ${char.physicalDescription}, ${char.currentEmotion}`
    ).join(', ');
  }
  
  private getCameraWork(action: string): string {
    const cameraMap = {
      'walking': 'tracking shot, smooth dolly movement',
      'talking': 'medium shot, slight zoom in',
      'running': 'dynamic follow shot, handheld camera',
      'sitting': 'static shot, slow zoom',
      'dancing': 'sweeping camera movements, multiple angles'
    };
    
    return cameraMap[action.toLowerCase()] || 'standard cinematography';
  }
}
```

### 2. محرك تلقينات الصور (Imagen4/Flux)
```typescript
// src/services/prompts/imagePromptEngine.ts
interface ImagePromptSettings {
  platform: 'imagen4' | 'flux_context' | 'dalle3';
  style: string;
  quality: 'standard' | 'hd' | 'ultra';
  aspectRatio: string;
  lighting: string;
}

class ImagePromptEngine {
  private platformSettings = {
    imagen4: {
      prefix: '',
      suffix: '--style photorealistic --quality hd',
      maxLength: 1000
    },
    flux_context: {
      prefix: 'FLUX.1 Pro: ',
      suffix: ', ultra-detailed, professional photography',
      maxLength: 800
    },
    dalle3: {
      prefix: '',
      suffix: ', photorealistic, high detail',
      maxLength: 400
    }
  };
  
  generateImagePrompt(
    description: string, 
    character: Character | null,
    settings: ImagePromptSettings
  ): string {
    const platform = this.platformSettings[settings.platform];
    let prompt = platform.prefix;
    
    // إضافة وصف الشخصية (مع ضمان التناسق)
    if (character) {
      prompt += `${character.visualConsistencyKey}, `;
    }
    
    // إضافة الوصف الأساسي
    prompt += `${description}. `;
    
    // إضافة الإضاءة والأسلوب
    prompt += `Lighting: ${settings.lighting}. Style: ${settings.style}. `;
    
    // إضافة المعاملات التقنية
    prompt += platform.suffix;
    
    // قطع النص إذا كان طويلاً جداً
    if (prompt.length > platform.maxLength) {
      prompt = prompt.substring(0, platform.maxLength - 3) + '...';
    }
    
    return prompt;
  }
  
  generateCharacterConsistencyKey(character: Character): string {
    // إنشاء مفتاح ثابت للشخصية لضمان التناسق
    return `${character.name}: ${character.age}-year-old ${character.gender}, 
            ${character.hairColor} hair, ${character.eyeColor} eyes, 
            ${character.height}, ${character.build}, 
            wearing ${character.defaultOutfit}`;
  }
}
```

### 3. محرك تلقينات الصوت (ElevenLabs)
```typescript
// src/services/prompts/audioPromptEngine.ts
interface AudioSettings {
  voice: string;
  emotion: string;
  speed: number;
  stability: number;
  clarity: number;
}

interface DialogueItem {
  character: string;
  text: string;
  emotion: string;
  pause?: number;
  emphasis?: string[];
}

class AudioPromptEngine {
  private emotionTags = {
    happy: '[cheerful, upbeat]',
    sad: '[melancholy, slow]',
    angry: '[intense, sharp]',
    excited: '[energetic, fast]',
    calm: '[peaceful, steady]',
    mysterious: '[whispered, suspenseful]',
    dramatic: '[theatrical, emphasized]'
  };
  
  generateVoicePrompt(dialogue: DialogueItem, settings: AudioSettings): VoicePrompt {
    let processedText = dialogue.text;
    
    // إضافة علامات التوقف
    if (dialogue.pause) {
      processedText += `<break time="${dialogue.pause}s" />`;
    }
    
    // إضافة التأكيد على كلمات معينة
    if (dialogue.emphasis) {
      dialogue.emphasis.forEach(word => {
        processedText = processedText.replace(
          new RegExp(`\\b${word}\\b`, 'gi'),
          `<emphasis level="strong">${word}</emphasis>`
        );
      });
    }
    
    // إضافة علامات العاطفة
    const emotionTag = this.emotionTags[dialogue.emotion] || '';
    processedText = `${emotionTag} ${processedText}`;
    
    return {
      text: processedText,
      voice: settings.voice,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: settings.stability,
        similarity_boost: settings.clarity,
        style: settings.speed
      }
    };
  }
  
  generateMusicPrompt(scene: VideoScene, mood: string): string {
    const musicStyles = {
      epic: 'orchestral, cinematic, powerful drums, rising strings',
      romantic: 'soft piano, gentle strings, warm and intimate',
      suspense: 'dark ambient, tension building, minimalist',
      action: 'fast-paced, electronic beats, intense energy',
      peaceful: 'acoustic guitar, nature sounds, calm and relaxing'
    };
    
    const basePrompt = musicStyles[mood] || 'ambient background music';
    const duration = scene.duration || 30;
    
    return `Generate ${duration}-second background music: ${basePrompt}. 
            Tempo: medium, Key: C major, Mood: ${mood}. 
            No vocals, instrumental only.`;
  }
}
```

---

## 🔄 نظام Workflow

### مدير مراحل العمل
```typescript
// src/services/workflow/workflowManager.ts
interface WorkflowStage {
  id: string;
  number: number;
  name: string;
  type: StageType;
  status: StageStatus;
  dependencies: string[];
  estimatedDuration: number;
  maxRetries: number;
}

class WorkflowManager {
  private stages: WorkflowStage[] = [
    {
      id: 'idea_expansion',
      number: 1,
      name: 'توسيع الفكرة',
      type: 'idea_expansion',
      status: 'pending',
      dependencies: [],
      estimatedDuration: 120,
      maxRetries: 3
    },
    {
      id: 'media_analysis',
      number: 2,
      name: 'تحليل الوسائط',
      type: 'media_analysis',
      status: 'pending',
      dependencies: ['idea_expansion'],
      estimatedDuration: 180,
      maxRetries: 2
    },
    // المزيد من المراحل...
  ];
  
  async executeStage(projectId: string, stageId: string): Promise<StageResult> {
    const stage = this.stages.find(s => s.id === stageId);
    if (!stage) {
      throw new Error(`Stage ${stageId} not found`);
    }
    
    // التحقق من اكتمال المراحل التابعة
    for (const depId of stage.dependencies) {
      const isCompleted = await this.isStageCompleted(projectId, depId);
      if (!isCompleted) {
        throw new Error(`Dependency ${depId} not completed`);
      }
    }
    
    // تنفيذ المرحلة
    const result = await this.processStage(projectId, stage);
    
    // حفظ النتيجة
    await this.saveStageResult(projectId, stageId, result);
    
    return result;
  }
  
  private async processStage(projectId: string, stage: WorkflowStage): Promise<StageResult> {
    switch (stage.type) {
      case 'idea_expansion':
        return await this.expandIdea(projectId);
      case 'media_analysis':
        return await this.analyzeMedia(projectId);
      case 'script_generation':
        return await this.generateScript(projectId);
      // المزيد من أنواع المراحل...
      default:
        throw new Error(`Unknown stage type: ${stage.type}`);
    }
  }
}
```

يُتَبَع...
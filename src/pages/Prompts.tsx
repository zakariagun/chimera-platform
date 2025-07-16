import { Button, Card, TextInput } from '@/components/ui';
import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function Prompts() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPrompts = [
    { id: 1, title: 'تلقين فيديو متقدم', type: 'video', description: 'وصف التلقين...' },
    { id: 2, title: 'تلقين صورة إبداعي', type: 'image', description: 'وصف التلقين...' },
    { id: 3, title: 'تلقين صوتي', type: 'audio', description: 'وصف التلقين...' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">التلقينات</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          إضافة تلقين
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <TextInput
            placeholder="البحث في التلقينات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          فلترة
        </Button>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPrompts.map((prompt) => (
          <Card key={prompt.id} className="p-6">
            <h3 className="font-semibold mb-2">{prompt.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{prompt.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {prompt.type}
              </span>
              <Button size="sm">عرض</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

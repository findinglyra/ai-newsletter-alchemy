
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Wand2, 
  Send, 
  Eye, 
  Save,
  Sparkles,
  Mail,
  Target,
  Copy
} from 'lucide-react';

const CreateNewsletterPage = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI generation - in real app, this would call your backend API
    setTimeout(() => {
      const sampleContent = `# Welcome to Our Latest Newsletter!

Dear Valued Subscriber,

We're excited to share some incredible insights with you based on your prompt: "${prompt}"

## Key Highlights

✨ Industry trends that are shaping the future
🚀 Actionable strategies you can implement today  
💡 Expert insights from leading professionals
📈 Growth opportunities in your sector

## What's New This Week

Our team has been working tirelessly to bring you the most relevant and actionable content. Whether you're looking to scale your business, improve your marketing efforts, or stay ahead of industry trends, we've got you covered.

## Special Offer

Don't miss out on our exclusive opportunity designed just for our newsletter subscribers. This limited-time offer includes:

- Premium access to our latest resources
- Exclusive webinar invitations
- Early bird pricing on upcoming events

## Community Spotlight

We love hearing from our community! Share your success stories and connect with like-minded professionals who are achieving amazing results.

---

Thank you for being part of our community. We're here to support your journey every step of the way.

Best regards,
The Newsletter AI Team`;

      setGeneratedContent(sampleContent);
      setSubjectLine(`🚀 Your Weekly Dose of Innovation - ${new Date().toLocaleDateString()}`);
      setCallToAction("Join Our Exclusive Webinar - Limited Seats Available!");
      setLoading(false);
      
      toast({
        title: "Content Generated!",
        description: "Your newsletter content has been generated successfully.",
      });
    }, 2000);
  };

  const handleSendNewsletter = () => {
    toast({
      title: "Newsletter Scheduled!",
      description: "Your newsletter has been scheduled for delivery. This feature will be integrated with your email service provider.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved!",
      description: "Your newsletter draft has been saved successfully.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Newsletter</h1>
          <p className="text-gray-600">Use AI to generate engaging newsletter content for your audience.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generation Panel */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="w-5 h-5 mr-2" />
                AI Content Generator
              </CardTitle>
              <CardDescription>
                Describe what you'd like your newsletter to be about
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-sm font-medium text-gray-700 mb-2 block">
                  Content Prompt
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., 'Write a newsletter about AI trends in marketing for small business owners, include practical tips and a call to action for a free consultation'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button
                onClick={handleGenerateContent}
                disabled={loading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>

              {/* Sample Prompts */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Sample Prompts:</h4>
                <div className="space-y-2 text-sm text-blue-600">
                  <p className="cursor-pointer hover:text-blue-800" onClick={() => setPrompt("Write a newsletter about productivity tips for remote workers, include actionable advice and a CTA for a productivity course")}>
                    💼 "Productivity tips for remote workers..."
                  </p>
                  <p className="cursor-pointer hover:text-blue-800" onClick={() => setPrompt("Create a newsletter about sustainable business practices, focusing on cost savings and environmental benefits")}>
                    🌱 "Sustainable business practices..."
                  </p>
                  <p className="cursor-pointer hover:text-blue-800" onClick={() => setPrompt("Write about digital marketing trends for 2024, include social media strategies and email marketing tips")}>
                    📱 "Digital marketing trends for 2024..."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Content Panel */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Generated Content
                </div>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {showPreview ? 'Edit' : 'Preview'}
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                {generatedContent ? 'Review and edit your generated content' : 'Your AI-generated content will appear here'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!generatedContent ? (
                <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Generate content to get started</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Subject Line */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject Line
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(subjectLine)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <Input
                      id="subject"
                      value={subjectLine}
                      onChange={(e) => setSubjectLine(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                        Newsletter Body
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(generatedContent)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    {showPreview ? (
                      <div className="p-4 bg-white border border-gray-200 rounded-lg prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br/>') }} />
                      </div>
                    ) : (
                      <Textarea
                        id="content"
                        value={generatedContent}
                        onChange={(e) => setGeneratedContent(e.target.value)}
                        className="min-h-[300px] border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  {/* Call to Action */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="cta" className="text-sm font-medium text-gray-700">
                        Call to Action
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(callToAction)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <Input
                      id="cta"
                      value={callToAction}
                      onChange={(e) => setCallToAction(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleSaveDraft}
                      variant="outline"
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button
                      onClick={handleSendNewsletter}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Newsletter
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsletterPage;

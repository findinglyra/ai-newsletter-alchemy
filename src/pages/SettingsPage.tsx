
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Key, 
  Mail, 
  User, 
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SettingsPage = () => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [mailchimpApiKey, setMailchimpApiKey] = useState('');
  const [mailchimpAudienceId, setMailchimpAudienceId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [showMailchimpKey, setShowMailchimpKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load settings from localStorage
    setOpenaiApiKey(localStorage.getItem('OPENAI_API_KEY') || '');
    setMailchimpApiKey(localStorage.getItem('MAILCHIMP_API_KEY') || '');
    setMailchimpAudienceId(localStorage.getItem('MAILCHIMP_AUDIENCE_ID') || '');
    setSenderName(localStorage.getItem('SENDER_NAME') || '');
    setSenderEmail(localStorage.getItem('SENDER_EMAIL') || '');
  }, []);

  const handleSaveSettings = () => {
    // Save to localStorage (in production, send to secure backend)
    localStorage.setItem('OPENAI_API_KEY', openaiApiKey);
    localStorage.setItem('MAILCHIMP_API_KEY', mailchimpApiKey);
    localStorage.setItem('MAILCHIMP_AUDIENCE_ID', mailchimpAudienceId);
    localStorage.setItem('SENDER_NAME', senderName);
    localStorage.setItem('SENDER_EMAIL', senderEmail);
    
    toast({
      title: "Settings Saved!",
      description: "Your configuration has been saved successfully.",
    });
  };

  const testApiConnection = (service: string) => {
    toast({
      title: `Testing ${service} Connection`,
      description: "This feature will be implemented in the full version.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your API keys and preferences for the newsletter assistant.</p>
        </div>

        <div className="space-y-6">
          {/* Security Warning */}
          <Card className="border-l-4 border-l-amber-500 bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">Security Notice</h3>
                  <p className="text-sm text-amber-700">
                    For demonstration purposes, API keys are stored locally. In a production environment, 
                    these should be securely stored on your backend server and never exposed to the client.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sender Information */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Sender Information
              </CardTitle>
              <CardDescription>
                Configure your sender details for newsletters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senderName" className="text-sm font-medium text-gray-700 mb-2 block">
                    Sender Name
                  </Label>
                  <Input
                    id="senderName"
                    type="text"
                    placeholder="Your Business Name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="senderEmail" className="text-sm font-medium text-gray-700 mb-2 block">
                    Sender Email
                  </Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    placeholder="hello@yourbusiness.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your third-party service API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OpenAI Configuration */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">OpenAI API</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testApiConnection('OpenAI')}
                  >
                    Test Connection
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="openaiApiKey" className="text-sm font-medium text-gray-700 mb-2 block">
                      API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="openaiApiKey"
                        type={showOpenaiKey ? "text" : "password"}
                        placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                        value={openaiApiKey}
                        onChange={(e) => setOpenaiApiKey(e.target.value)}
                        className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                      >
                        {showOpenaiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI's website</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Mailchimp Configuration */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Mailchimp Integration</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testApiConnection('Mailchimp')}
                  >
                    Test Connection
                  </Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="mailchimpApiKey" className="text-sm font-medium text-gray-700 mb-2 block">
                      API Key
                    </Label>
                    <div className="relative">
                      <Input
                        id="mailchimpApiKey"
                        type={showMailchimpKey ? "text" : "password"}
                        placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-usX"
                        value={mailchimpApiKey}
                        onChange={(e) => setMailchimpApiKey(e.target.value)}
                        className="pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowMailchimpKey(!showMailchimpKey)}
                      >
                        {showMailchimpKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Get your API key from <a href="https://admin.mailchimp.com/account/api/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mailchimp's account settings</a>
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="mailchimpAudienceId" className="text-sm font-medium text-gray-700 mb-2 block">
                      Audience ID
                    </Label>
                    <Input
                      id="mailchimpAudienceId"
                      type="text"
                      placeholder="xxxxxxxxxx"
                      value={mailchimpAudienceId}
                      onChange={(e) => setMailchimpAudienceId(e.target.value)}
                      className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Find this in your Mailchimp audience settings under "Audience name and defaults"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

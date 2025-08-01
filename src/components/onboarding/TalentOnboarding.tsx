import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Upload, Play, Pause, RotateCcw, Check, 
  ChevronRight, ChevronLeft, Star, Crown, Award,
  Camera, Video, Music, PenTool, Gamepad2, Theater
} from 'lucide-react';

interface TalentOnboardingProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

const TalentOnboarding: React.FC<TalentOnboardingProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    demoReel: null as File | null,
    skills: [] as string[],
    topThreePicks: [] as string[],
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const skillCategories = [
    { id: 'voice-acting', label: 'Voice Acting', icon: <Mic size={20} />, skills: ['Character Voices', 'Narration', 'Commercial VO', 'Audiobook', 'Animation', 'Video Games'] },
    { id: 'visual', label: 'Visual Arts', icon: <Camera size={20} />, skills: ['Cinematography', 'Photography', 'Animation', 'VFX', 'Editing', 'Color Grading'] },
    { id: 'audio', label: 'Audio Production', icon: <Music size={20} />, skills: ['Sound Design', 'Music Composition', 'Audio Engineering', 'Foley', 'Mixing', 'Mastering'] },
    { id: 'performance', label: 'Performance', icon: <Theater size={20} />, skills: ['Acting', 'Dance', 'Singing', 'Stand-up Comedy', 'Improv', 'Stage Performance'] },
    { id: 'writing', label: 'Writing', icon: <PenTool size={20} />, skills: ['Screenwriting', 'Copywriting', 'Creative Writing', 'Technical Writing', 'Journalism', 'Blogging'] },
    { id: 'gaming', label: 'Gaming', icon: <Gamepad2 size={20} />, skills: ['Game Design', 'Level Design', 'Game Writing', 'QA Testing', 'Streaming', 'Esports'] },
  ];

  const mockTopContent = [
    { id: '1', title: 'Horror Character Demo', type: 'audio', thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400', views: 2847 },
    { id: '2', title: 'Anime Character Range', type: 'video', thumbnail: 'https://images.pexels.com/photos/7504837/pexels-photo-7504837.jpeg?auto=compress&cs=tinysrgb&w=400', views: 1923 },
    { id: '3', title: 'Behind the Scenes', type: 'video', thumbnail: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=400', views: 3421 },
    { id: '4', title: 'Commercial Voice Demo', type: 'audio', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', views: 1456 },
    { id: '5', title: 'Character Breakdown', type: 'video', thumbnail: 'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=400', views: 892 },
    { id: '6', title: 'Voice Practice Session', type: 'audio', thumbnail: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=400', views: 234 },
  ];

  const steps = [
    { title: 'Record Demo Reel', description: 'Show off your talent with a 15-second professional demo' },
    { title: 'Tag Your Skills', description: 'Help others discover your expertise' },
    { title: 'Set Top 3 Picks', description: 'Choose your best content to spotlight on your profile' },
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setRecordedBlob(blob);
        setFormData({ ...formData, demoReel: new File([blob], 'demo-reel.wav') });
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingDuration(prev => {
          if (prev >= 15) {
            stopRecording();
            return 15;
          }
          return prev + 0.1;
        });
      }, 100);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playRecording = () => {
    if (recordedBlob) {
      const audio = new Audio(URL.createObjectURL(recordedBlob));
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setFormData({ ...formData, demoReel: null });
    setRecordingDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSkill = (skill: string) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: newSkills });
  };

  const toggleTopPick = (contentId: string) => {
    const newPicks = formData.topThreePicks.includes(contentId)
      ? formData.topThreePicks.filter(id => id !== contentId)
      : formData.topThreePicks.length < 3
        ? [...formData.topThreePicks, contentId]
        : formData.topThreePicks;
    setFormData({ ...formData, topThreePicks: newPicks });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return recordedBlob && recordingDuration >= 15;
      case 1: return formData.skills.length >= 3;
      case 2: return formData.topThreePicks.length === 3;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic size={48} className="text-primary-800" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Record Your Demo Reel</h2>
              <p className="text-neutral-600 mb-6">
                Show off your talent with a 15-second professional demo. This will be featured on your profile.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {!recordedBlob ? (
                <div className="space-y-6">
                  <div className="bg-neutral-100 rounded-xl p-6">
                    <div className="text-4xl font-bold text-primary-800 mb-2">
                      {Math.floor(recordingDuration)}s
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-100"
                        style={{ width: `${(recordingDuration / 15) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm text-neutral-600 mt-2">
                      {isRecording ? 'Recording...' : 'Ready to record'}
                    </div>
                  </div>

                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={recordingDuration >= 15 && !isRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-primary-800 hover:bg-primary-700 text-white'
                    }`}
                  >
                    {isRecording ? <Pause size={32} /> : <Mic size={32} />}
                  </button>

                  <div className="text-sm text-neutral-500">
                    {isRecording ? 'Tap to stop recording' : 'Tap to start recording'}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-success-50 border border-success-200 rounded-xl p-6">
                    <div className="flex items-center justify-center mb-4">
                      <Check size={24} className="text-success-600 mr-2" />
                      <span className="font-semibold text-success-800">Recording Complete!</span>
                    </div>
                    <div className="text-success-700">
                      Duration: {recordingDuration.toFixed(1)}s
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={isPlaying ? pauseRecording : playRecording}
                      className="w-16 h-16 bg-primary-800 hover:bg-primary-700 text-white rounded-full flex items-center justify-center"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    
                    <button
                      onClick={resetRecording}
                      className="w-16 h-16 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-full flex items-center justify-center"
                    >
                      <RotateCcw size={24} />
                    </button>
                  </div>

                  <div className="text-sm text-neutral-500">
                    Play to review • Reset to record again
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-secondary-800" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Tag Your Skills</h2>
              <p className="text-neutral-600">
                Select at least 3 skills that best represent your expertise. This helps others discover your talent.
              </p>
            </div>

            <div className="space-y-6">
              {skillCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl p-6 border border-neutral-200">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center mr-3">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-800">{category.label}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {category.skills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.skills.includes(skill)
                            ? 'bg-primary-800 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-neutral-600">
                Selected: {formData.skills.length} skills
                {formData.skills.length < 3 && (
                  <span className="text-orange-600 ml-2">
                    (Select at least {3 - formData.skills.length} more)
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-accent-500" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-2">Set Your Top 3 Picks</h2>
              <p className="text-neutral-600">
                Choose 3 pieces of content to spotlight on your profile. These will be the first things visitors see.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockTopContent.map((content) => (
                <div
                  key={content.id}
                  onClick={() => toggleTopPick(content.id)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transition-all ${
                    formData.topThreePicks.includes(content.id)
                      ? 'ring-4 ring-primary-500 transform scale-105'
                      : 'hover:transform hover:scale-102'
                  }`}
                >
                  <div className="aspect-[9/16] bg-neutral-900">
                    <img
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Selection indicator */}
                    {formData.topThreePicks.includes(content.id) && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-primary-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {formData.topThreePicks.indexOf(content.id) + 1}
                        </span>
                      </div>
                    )}
                    
                    {/* Content type indicator */}
                    <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      {content.type === 'audio' ? <Mic size={12} className="mr-1" /> : <Video size={12} className="mr-1" />}
                      {content.type}
                    </div>
                    
                    {/* Content info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <h4 className="text-white font-medium text-sm mb-1">{content.title}</h4>
                      <div className="text-white/80 text-xs">
                        {content.views.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm text-neutral-600">
                Selected: {formData.topThreePicks.length}/3 content pieces
                {formData.topThreePicks.length < 3 && (
                  <span className="text-orange-600 ml-2">
                    (Select {3 - formData.topThreePicks.length} more)
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/sakutsume-icon.svg" alt="SakuTsume" className="h-10 w-10 mr-3" />
            <h1 className="text-2xl font-bold text-neutral-800">Talent Onboarding</h1>
          </div>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep
                      ? 'bg-primary-800 text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {index < currentStep ? <Check size={16} /> : index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-600 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-neutral-600 mt-2">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={currentStep === 0 ? onBack : () => setCurrentStep(currentStep - 1)}
            className="flex items-center px-6 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft size={20} className="mr-2" />
            {currentStep === 0 ? 'Back to Role Selection' : 'Previous'}
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-primary-800 text-white hover:bg-primary-700'
                : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TalentOnboarding;
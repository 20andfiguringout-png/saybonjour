import React, { useState, useEffect } from 'react'
import { Brain, Clock, Award, CheckCircle, XCircle } from 'lucide-react'
import ContentSidebar from '../components/ContentSidebar'
import BookmarkButton from '../components/BookmarkButton'
import axios from 'axios'
import SEO from '../components/SEO'

const Quizzes = () => {
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedQuiz, setSelectedQuiz] = useState(null)
  const [expandedSections, setExpandedSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [quizState, setQuizState] = useState({
    started: false,
    currentQuestion: 0,
    answers: [],
    completed: false,
    score: 0
  })

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('/api/quizzes')
      setSections(response.data)
      
      if (response.data.length > 0) {
        const firstSection = response.data[0]
        setExpandedSections([firstSection.id])
        if (firstSection.items.length > 0) {
          setSelectedSection(firstSection.id)
          setSelectedItem(firstSection.items[0].id)
          setSelectedQuiz(firstSection.items[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch quizzes:', error)
      setDemoData()
    } finally {
      setLoading(false)
    }
  }

  const setDemoData = () => {
    const demoSections = [
      {
        id: 1,
        title: 'Basic French',
        items: [
          {
            id: 1,
            title: 'French Greetings Quiz',
            description: 'Test your knowledge of basic French greetings',
            difficulty: 'Beginner',
            questions: [
              {
                id: 1,
                question: 'How do you say "Hello" in French?',
                options: ['Bonjour', 'Bonsoir', 'Salut', 'Au revoir'],
                correct: 0
              },
              {
                id: 2,
                question: 'What does "Merci" mean?',
                options: ['Please', 'Thank you', 'Excuse me', 'Sorry'],
                correct: 1
              },
              {
                id: 3,
                question: 'How do you say "Good evening" in French?',
                options: ['Bonjour', 'Bonsoir', 'Bonne nuit', 'Salut'],
                correct: 1
              }
            ]
          },
          {
            id: 2,
            title: 'French Numbers 1-10',
            description: 'Quiz on basic French numbers',
            difficulty: 'Beginner',
            questions: [
              {
                id: 1,
                question: 'How do you say "five" in French?',
                options: ['quatre', 'cinq', 'six', 'sept'],
                correct: 1
              },
              {
                id: 2,
                question: 'What number is "huit"?',
                options: ['6', '7', '8', '9'],
                correct: 2
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Grammar',
        items: [
          {
            id: 3,
            title: 'French Articles Quiz',
            description: 'Test your understanding of le, la, les',
            difficulty: 'Intermediate',
            questions: [
              {
                id: 1,
                question: 'Which article goes with "maison" (house)?',
                options: ['le', 'la', 'les', 'un'],
                correct: 1
              }
            ]
          }
        ]
      }
    ]
    
    setSections(demoSections)
    setExpandedSections([1])
    setSelectedSection(1)
    setSelectedItem(1)
    setSelectedQuiz(demoSections[0].items[0])
  }

  const handleToggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleItemSelect = (itemId) => {
    console.log('Quiz selection - itemId:', itemId)

    const quiz = sections
      .flatMap(section => section.items)
      .find(item => item.id === itemId)

    // Find which section this quiz belongs to
    const parentSection = sections.find(section =>
      section.items.some(item => item.id === itemId)
    )

    console.log('Quiz selection - found quiz:', quiz?.title)
    console.log('Quiz selection - parent section:', parentSection?.title)

    setSelectedQuiz(quiz)
    setSelectedItem(itemId)
    if (parentSection) {
      setSelectedSection(parentSection.id)
    }

    // Reset quiz state when switching quizzes
    setQuizState({
      started: false,
      currentQuestion: 0,
      answers: [],
      completed: false,
      score: 0
    })
  }

  const startQuiz = () => {
    setQuizState(prev => ({
      ...prev,
      started: true,
      currentQuestion: 0,
      answers: [],
      completed: false,
      score: 0
    }))
  }

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...quizState.answers]
    newAnswers[quizState.currentQuestion] = answerIndex
    
    const isLastQuestion = quizState.currentQuestion === selectedQuiz.questions.length - 1
    
    if (isLastQuestion) {
      // Calculate score
      const score = newAnswers.reduce((total, answer, index) => {
        return total + (answer === selectedQuiz.questions[index].correct ? 1 : 0)
      }, 0)
      
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        completed: true,
        score
      }))
    } else {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        currentQuestion: prev.currentQuestion + 1
      }))
    }
  }

  const resetQuiz = () => {
    setQuizState({
      started: false,
      currentQuestion: 0,
      answers: [],
      completed: false,
      score: 0
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    )
  }

  // Dynamic SEO based on selected quiz
  const seoTitle = selectedQuiz
    ? `${selectedQuiz.title} | French Quiz - SayBonjour`
    : "French Quizzes & Tests | Practice French - SayBonjour"

  const seoDescription = selectedQuiz
    ? `Test your French knowledge with ${selectedQuiz.title}. ${selectedQuiz.description} - Interactive French quiz on SayBonjour platform.`
    : "Test your French knowledge with interactive quizzes and assessments. Practice French grammar, vocabulary, and comprehension with immediate feedback."

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={selectedQuiz
          ? `french quiz ${selectedQuiz.title.toLowerCase()}, ${selectedQuiz.difficulty?.toLowerCase()} french quiz, french test, practice french`
          : "french quizzes, french tests, practice french, french assessment, french quiz online, learn french quiz"
        }
        url="/quizzes"
        type={selectedQuiz ? "course" : "website"}
        image="/og-quizzes.jpg"
        section="French Learning"
        tags={selectedQuiz ? [selectedQuiz.difficulty, "French", "Quiz", "Assessment"] : ["French", "Quizzes", "Learning", "Practice"]}
      />
      <div className="flex h-screen pt-16">
      <ContentSidebar
        sections={sections}
        selectedSection={selectedSection}
        selectedItem={selectedItem}
        onSectionSelect={setSelectedSection}
        onItemSelect={handleItemSelect}
        expandedSections={expandedSections}
        onToggleSection={handleToggleSection}
      />

      {/* Debug info - remove this after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 text-xs rounded z-50">
          <div>Selected Section: {selectedSection}</div>
          <div>Selected Item: {selectedItem}</div>
          <div>Selected Quiz: {selectedQuiz?.title || 'None'}</div>
          <div>Quiz Started: {quizState.started ? 'Yes' : 'No'}</div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto w-full md:w-auto">
        {selectedQuiz ? (
          <div className="max-w-4xl mx-auto p-8">
            {!quizState.started ? (
              // Quiz Preview
              <div className="text-center">
                <div className="mb-6">
                  <div className="flex items-start justify-center mb-4 relative">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedQuiz.title}
                    </h1>
                    <div className="absolute right-0 top-0">
                      <BookmarkButton
                        item={selectedQuiz}
                        type="quizzes"
                        variant="floating"
                        size="lg"
                      />
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {selectedQuiz.description}
                  </p>
                  
                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-8">
                    <div className="flex items-center space-x-1">
                      <Brain size={16} />
                      <span>{selectedQuiz.questions?.length || 0} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>~{(selectedQuiz.questions?.length || 0) * 2} minutes</span>
                    </div>
                    {selectedQuiz.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedQuiz.difficulty === 'Beginner'
                          ? 'bg-burgundy-100 text-burgundy-800'
                          : selectedQuiz.difficulty === 'Intermediate'
                          ? 'bg-burgundy-200 text-burgundy-800'
                          : 'bg-burgundy-300 text-burgundy-900'
                      }`}>
                        {selectedQuiz.difficulty}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={startQuiz}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Start Quiz
                </button>
              </div>
            ) : quizState.completed ? (
              // Quiz Results
              <div className="text-center">
                <div className="mb-6">
                  <Award size={64} className="text-burgundy-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Quiz Completed!
                  </h2>
                  <div className="text-6xl font-bold text-primary-600 mb-4">
                    {Math.round((quizState.score / selectedQuiz.questions.length) * 100)}%
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    You got {quizState.score} out of {selectedQuiz.questions.length} questions correct
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {selectedQuiz.questions.map((question, index) => (
                    <div key={question.id} className="card p-4 text-left">
                      <div className="flex items-start space-x-3">
                        {quizState.answers[index] === question.correct ? (
                          <CheckCircle className="text-burgundy-600 mt-1" size={20} />
                        ) : (
                          <XCircle className="text-burgundy-400 mt-1" size={20} />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">
                            {question.question}
                          </p>
                          <p className="text-sm text-gray-600">
                            Correct answer: {question.options[question.correct]}
                          </p>
                          {quizState.answers[index] !== question.correct && (
                            <p className="text-sm text-burgundy-600">
                              Your answer: {question.options[quizState.answers[index]]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={resetQuiz}
                  className="btn-primary"
                >
                  Take Quiz Again
                </button>
              </div>
            ) : (
              // Quiz Question
              <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Question {quizState.currentQuestion + 1} of {selectedQuiz.questions.length}
                    </h2>
                    <div className="text-sm text-gray-600">
                      {selectedQuiz.title}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((quizState.currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="card p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                    {selectedQuiz.questions[quizState.currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-4">
                    {selectedQuiz.questions[quizState.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </div>
                          <span className="text-lg">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Brain size={48} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Quiz
              </h2>
              <p className="text-gray-600">
                Choose a quiz from the sidebar to test your knowledge
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Quizzes

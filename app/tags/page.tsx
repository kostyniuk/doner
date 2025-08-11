'use client';

import React, { useState } from 'react';
import Tag from '@/app/tags/tag';

interface Tag {
  id: number;
  name: string;
  color: string;
  count: number;
}

const TagsPage = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: 'Work', color: 'bg-blue-500', count: 3 },
    { id: 2, name: 'Personal', color: 'bg-green-500', count: 2 },
    { id: 3, name: 'Urgent', color: 'bg-red-500', count: 1 },
    { id: 4, name: 'Ideas', color: 'bg-purple-500', count: 4 },
  ]);

  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  const [isAdding, setIsAdding] = useState(false);

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  const addTag = () => {
    if (newTagName.trim() !== '') {
      const newTag: Tag = {
        id: Date.now(),
        name: newTagName.trim(),
        color: selectedColor,
        count: 0,
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setSelectedColor('bg-blue-500');
      setIsAdding(false);
    }
  };

  const deleteTag = (id: string | number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div className="flex-1 min-h-screen text-white">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Tags</h1>
            <p className="text-gray-300">
              Organize your tasks with custom tags and categories
            </p>
          </div>

          {/* Add Tag Section */}
          <div className="mb-8">
            {!isAdding ? (
              <button
                onClick={() => setIsAdding(true)}
                className="glass-card flex items-center gap-3 p-4 border-2 border-dashed border-white/20 rounded-lg hover:border-white/30 transition-colors group"
              >
                <div className="w-6 h-6 rounded-full border-2 border-gray-300/50 flex items-center justify-center group-hover:border-gray-300/80">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-gray-200">Add new tag</span>
              </button>
            ) : (
              <div className="glass-card p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Tag name"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-4 py-2 rounded-md border border-transparent focus:ring-0"
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Choose color:</label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full ${color} ${
                          selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Add Tag
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNewTagName('');
                      setSelectedColor('bg-blue-500');
                    }}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                id={tag.id}
                name={tag.name}
                color={tag.color}
                count={tag.count}
                variant="card"
                onDelete={deleteTag}
              />
            ))}
          </div>

          {/* Empty State */}
          {tags.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-800/60 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-300">No tags yet</h3>
              <p className="text-gray-400">Create your first tag to organize your tasks</p>
            </div>
          )}

          {/* Statistics */}
          {tags.length > 0 && (
            <div className="mt-12 glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="grid grid-cols-1 md-grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400">{tags.length}</div>
                  <div className="text-gray-300 text-sm">Total Tags</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {tags.reduce((sum, tag) => sum + tag.count, 0)}
                  </div>
                  <div className="text-gray-300 text-sm">Tagged Tasks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">
                    {tags.filter(tag => tag.count > 0).length}
                  </div>
                  <div className="text-gray-300 text-sm">Active Tags</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagsPage;

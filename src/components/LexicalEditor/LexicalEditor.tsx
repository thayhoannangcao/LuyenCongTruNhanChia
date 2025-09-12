import Placeholder from '@/components/editor/components/Placeholder';
import CustomOnChangePlugin from '@/components/editor/plugins/CustomOnChangePlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import clsx from 'clsx';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import Toolbar from '../../../../components/editor/components/Toolbar';
import { initialConfig } from '../../../../components/editor/constants';
import CodeHighlightPlugin from '../../../../components/editor/plugins/CodeHighlightPlugin';
import LocalStoragePlugin from '../../../../components/editor/plugins/LocalStoragePlugin';
interface EditorProps<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TFieldName;
  disabled?: boolean;
  className?: string;
  classNameToolbar?: string;
}

function LexicalEditor<
  TFieldValues extends FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  disabled,
  className,
  classNameToolbar,
}: EditorProps<TFieldValues, TFieldName> & Omit<any, 'onChange'>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <LexicalComposer
            // key={field.value}
            initialConfig={{
              ...initialConfig,
              editorState: typeof field.value === 'string' ? null : field.value,
              editable: !disabled,
            }}
          >
            <div className="flex h-full w-full flex-col font-normal">
              <div className="min-h-0 flex-1 overflow-auto">
                <RichTextPlugin
                  contentEditable={
                    <div
                      className={clsx(
                        'h-full overflow-auto border-0 py-3 outline-none',
                        disabled ? 'flex' : '',
                        className
                      )}
                    >
                      <ContentEditable className="h-full w-full resize-none overflow-auto font-arial text-[14px] text-text-secondary outline-none" />
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                  placeholder={<Placeholder className="" />}
                />
              </div>
              {!disabled && (
                <div
                  className={clsx(
                    'w-full flex-shrink-0 border-t',
                    classNameToolbar
                  )}
                >
                  <Toolbar />
                </div>
              )}

              <CodeHighlightPlugin />
              <HistoryPlugin />
              <CustomOnChangePlugin
                value={field?.value ?? '<p class="paragraph"><br></p>'}
                onChange={field.onChange}
              />
              <LocalStoragePlugin namespace={initialConfig.namespace} />
              <ListPlugin />
              <HorizontalRulePlugin />
              <CheckListPlugin />
            </div>
          </LexicalComposer>
        );
      }}
    />
  );
}

export default LexicalEditor;
